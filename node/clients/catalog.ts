import type { InstanceOptions, IOContext } from '@vtex/api'
import { AppGraphQLClient, GraphQLClient } from '@vtex/api'

import { GET_PRODUCTS_BY_CATEGORY, QUERY_PRODUCT, QUERY_SEARCH } from './query'
import { productsQuery, ProductQuery } from '../typings/queryInputs/product'
import { SearchParams } from '../typings/queryInputs/search'

export class CatalogClient extends AppGraphQLClient {
  protected graphql: GraphQLClient

  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.catalog-graphql@1.x', context, options)
    this.graphql = new GraphQLClient(this.http)
  }

  public SearchProducts = async (searchParams: SearchParams) => {
    return this.graphql.query<any, SearchParams>({
      query: QUERY_SEARCH,
      variables: {
        ...searchParams,
      },
    })
  }
  public SearchProductsByCategory = async (category:number,page:number,search:string,pageSize:number ) => {
    return this.graphql.query<any, productsQuery>({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: {
        category,
        page,
        search,
        pageSize
      },
    })
  }
  public Product = async (id: string) => {
    return this.graphql.query<any, ProductQuery>({
      query: QUERY_PRODUCT,
      variables: {
        id,
        pId:parseInt(id)
      },
    })
  }
}
