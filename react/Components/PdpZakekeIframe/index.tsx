/* eslint-disable vtex/prefer-early-return */
/* eslint-disable @typescript-eslint/naming-convention */
import type { FC, ReactChild } from 'react'
import React, { useEffect, useState } from 'react'
import { canUseDOM } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

import { zakekeContainerStyles } from './zakekepdp.css'

interface ScripstJsProps {
  children: ReactChild
  merchant: string
}

const ScripstJs: FC<ScripstJsProps> = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const { orderForm } = useOrderForm()
  let mobile: boolean
  const { isMobile } = useDevice()

  useEffect(() => {
    if (!canUseDOM) {
      return
    }

    if (!(orderForm.id !== 'default-order-form')) {
      return
    }

    if (document.getElementById('script-zakeke')) {
      setIsScriptLoaded(true)

      return
    }

    const id = '564'
    const name = '3/4 Poly-Satin Dye-Sub Custom Lanyard - Metal Bulldog Clip'

    if (isMobile) {
      mobile = true
    }

    const config = {
      tokenoauth:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU2VsbGVyIiwiUGVybUJpdHMiOiIwMTAwMTExMDAxMTAwMTExMTExMTAxIiwidW5pcXVlX25hbWUiOiJjcGhpbGxpcEBpZHZpbGxlLmNvbSIsIlVzZXJJRCI6IjExNDA3MSIsIlVzZXJOYW1lIjoiY3BoaWxsaXBAaWR2aWxsZS5jb20iLCJzYWxlc0NoYW5uZWxJRCI6IjEiLCJlbWFpbCI6InBwY0BpZHZpbGxlLmNvbSIsIlVzZXJUeXBlSUQiOiIzIiwiSXNzdWVEYXRlIjoiMDUtMDctMjAyMyAxMi0zMC0xMFoiLCJVc2VyVmVyc2lvbiI6IjIwMjMwNzA1MDQ1NzQ3IiwiY3VzdG9tZXJjb2RlIjoiMTIzNDU2Nzg5IiwiYWNjZXNzVHlwZSI6IlMyUyIsImNsaWVudElEIjoiMTMxMTM0IiwibmJmIjoxNjg4NTYwMjEwLCJleHAiOjE2ODg2NDY2MTAsImlhdCI6MTY4ODU2MDIxMCwiaXNzIjoid3d3Lnpha2VrZS5jb20iLCJhdWQiOiJodHRwczovL3d3dy56YWtla2UuY29tIn0.gm7pGq6PWVM-5XwQLJaE7NQypqTYxf4TCvZ_gL8yojg',
      mobileversion: mobile,
      culture: 'en-US',
      currency: 'USD',
      pricetaxincluded: true,
      labeltax: 'hidden',
      productinfourl:
        'https://idville.myvtex.com/api/io/_/zakeke/getproductinfo',
      quantity: 1,
      shoppingcarturl: 'https://idville.myvtex.com/api/io/_/zakeke/addtocart',
      selectedattributes: {
        '31': '845',
      },
      additionaldata: {
        orderFormId: orderForm.id,
      },
    }

    const config_2 = JSON.stringify(config)

    const scriptContent = `var customizer = new zakekeDesigner(${config_2},{ "id": "${id}",
    "name": "${name}"});`

    const script = document.createElement('script')
    const script_2 = document.createElement('script')

    script.src = `https://portal.zakeke.com/scripts/config.js`
    script.id = 'script-zakeke'
    script_2.src = `https://portal.zakeke.com/scripts/integration/api/customizer.js`

    script_2.onload = () => {
      setIsScriptLoaded(true)
    }

    window?.document.querySelector('head')?.appendChild(script)
    window?.document.querySelector('head')?.appendChild(script_2)

    const observer = new MutationObserver(() => {
      const container = document.getElementById('zakeke-container')

      if (container) {
        observer.disconnect()
        const script_3 = document.createElement('script')

        script_3.id = 'script-zakeke-export'
        script_3.innerHTML = scriptContent
        window?.document.querySelector('head')?.appendChild(script_3)
      }
    })

    observer.observe(document, { childList: true, subtree: true })
  }, [isScriptLoaded, canUseDOM, orderForm.id])

  if (!isScriptLoaded) {
    return null
  }

  return (
    <>
      <div className={`${zakekeContainerStyles}`} id="zakeke-container"></div>
    </>
  )
}

export default ScripstJs
