import { GetProductRes } from "../typings/results/product"
import { configuration } from "../typings/types/configuration"
import { OptionsType } from "../typings/types/optionsType"

export async function item(ctx: Context, next: () => Promise<any>) {
    try {
        const {
            clients: {
                catalogClient, apps
            },
            vtex: {
                route: { params },
            },
        } = ctx

        const app: string = process.env.VTEX_APP_ID ?? ''

        const settings: configuration = await apps.getAppSettings(app)

        const productId = params.product as string

        const results: GetProductRes = await catalogClient.Product(productId) as any

        const product = results.data.products.items.find((product) => product.id == productId)

        if (!product) {
            ctx.body = []
            return
        }

        const options = settings.customizableCategories.find((category) => `${category.categoryId}` == results.data.product.categoryId)

        if (!options) {
            ctx.body = []
            return
        }

        const optionsRes: OptionsType[] = [
            {
                code: `${options?.categoryId}`,
                name: options?.personalization,
                values: product.skus.map((sku) => {
                    return {
                        code: sku.id,
                        name: sku.skuName
                    }
                })
            }
        ]

        ctx.status = 200
        ctx.body = optionsRes
        await next()
    } catch (error) {
        console.error(error)
        ctx.body = []
    }
}