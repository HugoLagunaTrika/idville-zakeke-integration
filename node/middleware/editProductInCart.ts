import { json } from "co-body";
import { GetProductRes } from "../typings/results/product";
import { configuration } from "../typings/types/configuration"
import { AddToCartRequest } from "../typings/types/addToCartRequest";
import { CartItem } from "../typings/types/cartItems";

export async function editProductCart(ctx: Context, _: () => Promise<any>) {
    ctx.set('Content-Type', 'application/json')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Cache-Control', 'private')
    ctx.set('Access-Control-Request-Headers', '*')
    try {
        const {
            clients: {
                catalogClient, logisticsClient, checkoutClient, apps
            }
        } = ctx


        const app: string = process.env.VTEX_APP_ID ?? ''

        const settings: configuration = await apps.getAppSettings(app)

        const body: AddToCartRequest = await json(ctx.req);

        const productRes: GetProductRes = await catalogClient.Product(body.productid) as any

        let isOutOfStock = false

        const category = settings.customizableCategories.find((category) => `${category.categoryId}` == productRes.data.product.categoryId)
        if (!category) {
            ctx.status = 404
            ctx.body = {
                "message": "category not found"
            }
            return
        }
        const product = productRes.data.products.items.find((product) => product.id == body.productid)
        let selectedSkus = ""
        if( body.selectedattributes[0]){
            selectedSkus = body.selectedattributes[0][category.personalization]  || body.selectedattributes[0][category.categoryId]
        }else{
            selectedSkus = body.selectedattributes[category.personalization]  || body.selectedattributes[category.categoryId]
        }
        const isProductSku = product?.skus.find((sku) => sku.id == selectedSkus)
        if (!isProductSku) {
            ctx.status = 404
            ctx.body = {
                "message": "modification not found"
            }
            return
        }

        const inventory = await logisticsClient.getInventory(selectedSkus)
        const selectedInv = inventory.balance.find((inv) => inv.warehouseId != "Out of Stock")
        if (!selectedInv || (!selectedInv.hasUnlimitedQuantity && (selectedInv.totalQuantity - selectedInv.reservedQuantity) <= 0)) {
            isOutOfStock = true
        }

        if (isOutOfStock) {
            ctx.status = 400
            ctx.body = {
                "message": "product is out of stock"
            }
        }


        try {
            const actualCart = await checkoutClient.getCart(body.additionaldata.orderFormId)
            const presservedItems: any[] = actualCart.items.filter((item: any) => item.productId != body.productid)
            const cartItems: CartItem[] = presservedItems.map((item: any) => {
                return {
                    id: item.id,
                    quantity: item.quantity,
                    seller: item.seller,
                    attachments: item.attachments,
                }
            })
            cartItems.push({
                id: selectedSkus,
                quantity: body.quantity,
                seller: "1",
                attachments: [
                    {
                        name: "zakeke",
                        content: {
                            imageUrl: "",
                            desingId: body.designid,
                        }
                    }
                ],
            })
            await checkoutClient.removeItems(body.additionaldata.orderFormId)
            await checkoutClient.addToCart(cartItems, body.additionaldata.orderFormId)

        } catch (error) {
            console.log(error);
            ctx.status = 500
            ctx.body = {
                "message": "error adding to cart"
            }
            return
        }
        ctx.status = 200
        ctx.body = {
            returnurl: settings.domain
        }
        return
    } catch (error) {
        console.log(error);

        ctx.status = 500
        ctx.body = {
            "message": "error adding to cart"
        }
        return
    }
}