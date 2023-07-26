/* eslint-disable vtex/prefer-early-return */
/* eslint-disable @typescript-eslint/naming-convention */
import type { FC, ReactChild } from "react";
import React, { useEffect, useState } from "react";
import { canUseDOM } from "vtex.render-runtime";
import { useDevice } from "vtex.device-detector";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useProduct } from "vtex.product-context";
import { zakekeContainerStyles } from "./zakekepdp.css";

interface ScripstJsProps {
  children: ReactChild;
  merchant: string;
}

const ScripstJs: FC<ScripstJsProps> = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const { orderForm } = useOrderForm();
  let mobile: boolean;
  let token: string | null = null;
  let tokenAuth: string | null = null;
  const productContextValue = useProduct();
  const { isMobile } = useDevice();

  async function getToken() {
    if (!isTokenLoaded) {
      try {
        const url = "https://idville.myvtex.com/_/zakeke/getToken";
        let data: any;
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
          const [name, value] = cookie.trim().split("=");
          if (name === "biggy-session-idville") {
            token = value;
            break;
          }
        }

        data = {
          visitorcode: token,
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          tokenAuth = responseData.access_token;
          setIsTokenLoaded(true);
          return tokenAuth;
        } else {
          console.error("Error Request:", response.status);
          return "";
        }
      } catch (error) {
        console.error("Error get token:", error);
      }
    }
    return "";
  }

  useEffect(() => {
    if (!canUseDOM) {
      return;
    }

    if (document.getElementById("script-zakeke")) {
      setIsScriptLoaded(true);

      return;
    }

    if (isMobile) {
      mobile = true;
    }

    getToken().then((tokenAuth) => {
      const id = productContextValue.product.productId;
      const name = productContextValue.product.productName;
      
      // const id = '564'
      // const name = '3/4 Poly-Satin Dye-Sub Custom Lanyard - Metal Bulldog Clip'
      const config = {
        tokenoauth: tokenAuth,
        mobileversion: mobile,
        culture: "en-US",
        currency: "USD",
        pricetaxincluded: true,
        labeltax: "hidden",
        designid: '',
        productinfourl:
          "https://idville.myvtex.com/api/io/_/zakeke/getproductinfo",
        quantity: window.location.href.split('selectedQuantity=')[1],
        shoppingcarturl: "https://idville.myvtex.com/api/io/_/zakeke/addtocart",
        editshoppingcartcallback: "https://idville.myvtex.com/api/io/_/zakeke/addtocart",
        selectedattributes: {},
        additionaldata: {
          orderFormId: orderForm.id,
        },
      };

      const config_2 = JSON.stringify(config);

      const scriptContent = `var customizer = new zakekeDesigner(${config_2},{ "id": "${id}",
    "name": "${name}"});`;

      const script = document.createElement("script");
      const script_2 = document.createElement("script");

      script.src = `https://portal.zakeke.com/scripts/config.js`;
      script.id = "script-zakeke";
      script_2.src = `https://portal.zakeke.com/scripts/integration/api/customizer.js`;

      window?.document.querySelector("head")?.appendChild(script);
      window?.document.querySelector("head")?.appendChild(script_2);

      script_2.onload = () => {
        setIsScriptLoaded(true);
      };

      const observer = new MutationObserver(() => {
        const container = document.getElementById("zakeke-container");

        if (container) {
          observer.disconnect();
          const script_3 = document.createElement("script");

          script_3.id = "script-zakeke-export";
          script_3.innerHTML = scriptContent;
          window?.document.querySelector("head")?.appendChild(script_3);
        }
      });

      observer.observe(document, { childList: true, subtree: true });
    });
  }, [isScriptLoaded, canUseDOM, orderForm.id]);

  if (!isScriptLoaded) {
    return null;
  }

  return (
    <>
      <div className={`${zakekeContainerStyles}`} id="zakeke-container"></div>
    </>
  );
};

export default ScripstJs;
