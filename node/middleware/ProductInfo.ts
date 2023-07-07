import { json } from "co-body";
import { CartSimulation } from "../typings/results/cartSimulation";
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
                catalogClient, logisticsClient, checkoutClient, apps
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
        let selectedSkus = ""
        if( body.selectedattributes[0]){
            selectedSkus = body.selectedattributes[0][category.personalization]  || body.selectedattributes[0][category.categoryId]
        }else{
            selectedSkus = body.selectedattributes[category.personalization]  || body.selectedattributes[category.categoryId]
        }
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
        const selectedInv = inventory.balance.find((inv) => inv.warehouseId != "Out of Stock")
        if (!selectedInv || (!selectedInv.hasUnlimitedQuantity && (selectedInv.totalQuantity - selectedInv.reservedQuantity) <= 0)) {
            isOutOfStock = true
        }

        const cartSimulation:CartSimulation = await checkoutClient.cartSimulation({
            id:selectedSkus,
            quantity:body.quantity,
            seller: "1"
        });    
        
        let price = 0

        cartSimulation.totals.forEach((total) => {
            if(["Items","Discounts","Tax"].includes(total.id)){
                price += total.value
            }
        })

        ctx.status = 200
        ctx.body = {
            "finalprice": price/100,

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