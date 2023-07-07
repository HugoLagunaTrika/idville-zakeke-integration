import { configuration } from "../typings/types/configuration";
import { ProductsResponse } from "../typings/results/products";
import { Product } from "../typings/types/product";

export async function catalog(ctx: Context, next: () => Promise<any>) {
  const {
    URL: {
      searchParams,
    },
    clients: { catalogClient, apps },
  } = ctx

  const app: string = process.env.VTEX_APP_ID ?? ''
  const settings: configuration = await apps.getAppSettings(app)

  const pageSize = 20;

  const page = parseInt(searchParams.get('page') || '1');

  const search = searchParams.get('search') || '';

  const products:Product[] = []

  for(let category of settings.customizableCategories){
    const searchResults: ProductsResponse = await catalogClient.SearchProductsByCategory(category.categoryId, 1, search, 1000) as any
    if(searchResults.data.products.paging.total>0){
      const formatedProducts:Product[] = searchResults.data.products.items.map((item) => {
        return{
          code: item.id,
          name: item.name,
          thumbnail: item.imageUrl
        }
      })
      products.push(...formatedProducts)
      if(products.length>=pageSize*page){
        break
      }
    }
  }

  const paggingProducts = products.slice((page-1)*pageSize,page*pageSize)
  try {
    ctx.status = 200
    ctx.body = paggingProducts
    await next()
  } catch (error) {
    console.error("ERROR")

    const { response: { status } } = error;
    ctx.status = parseInt(status)
    ctx.body = {
      response: "error"
    }
  }
}