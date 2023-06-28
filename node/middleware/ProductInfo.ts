import { json } from "co-body";
import { GetProductRes } from "../typings/results/product";
import { configuration } from "../typings/types/configuration"
import { ProductInfoRequest } from "../typings/types/productInfoRequest";

export async function productInfo(ctx: Context, _: () => Promise<any>) {
    ctx.set('Content-Type', 'application/json')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Cache-Control', 'private')
    ctx.set('Access-Control-Request-Headers', '*')
    try {
        const {
            clients: {
                catalogClient, logisticsClient,apps
            }
        } = ctx


        const app: string = process.env.VTEX_APP_ID ?? ''

        const settings: configuration = await apps.getAppSettings(app)

        const body: ProductInfoRequest = await json(ctx.req);

        const productRes: GetProductRes = await catalogClient.Product(body.productid) as any

        let isOutOfStock = false

        const category = settings.customizableCategories.find((category) => `${category.categoryId}` == productRes.data.product.categoryId)
        if (!category) {
            ctx.status = 200
            ctx.body = {
                "finalprice": 0,

                "isoutofstock": true
            }
            return
        }
        const product = productRes.data.products.items.find((product) => product.id == body.productid)
        const selectedSkus = body.selectedattributes[0][category.personalization]
        const isProductSku = product?.skus.find((sku) => sku.id == selectedSkus)
        if (!isProductSku) {
            ctx.status = 200
            ctx.body = {
                "finalprice": 0,

                "isoutofstock": true
            }
            return
        }

        const inventory = await logisticsClient.getInventory(selectedSkus)
        console.log(inventory);
        
        const selectedInv = inventory.balance.find((inv) => inv.warehouseId != "Out of Stock")
        if (!selectedInv || (!selectedInv.hasUnlimitedQuantity && (selectedInv.totalQuantity-selectedInv.reservedQuantity) <= 0) ) {
            isOutOfStock = true
        }


        ctx.status = 200
        ctx.body = {
            "finalprice": 0,

            "isoutofstock": isOutOfStock
        }
        return
    } catch (error) {
        console.log(error);
        
        ctx.status = 200
        ctx.body = {
            "finalprice": 0,

            "isoutofstock": true
        }
        return
    }
}