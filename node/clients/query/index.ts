export const QUERY_SEARCH = `
query GetProductAvailable(
  $queryKey: String
  $queryMap: String
  $queryFullText: String
  $queryFrom: Int
  $queryTo: Int
  $queryOrderBy: String
  $queryFacets: [SelectedFacetInput]
){
  productSearch(
    fullText: $queryFullText,
    query: $queryKey,
    map: $queryMap,
    from: $queryFrom,
    to: $queryTo,
    orderBy: $queryOrderBy,
    selectedFacets: $queryFacets,

    simulationBehavior: skip,
    productOriginVtex: false,
    operator: and,
    fuzzy: "0",
    hideUnavailableItems: true
  ){
    recordsFiltered
    products{
      brand
      productName
      productId
      linkText
      productReference
      clusterHighlights{
        name
      }
      properties{
        name
        originalName
        values
      }
      items{
        itemId
        images{
          imageUrl
          imageId
        }
        sellers{
          sellerDefault
          sellerId
          commertialOffer{
            Price
            ListPrice
            AvailableQuantity
          }
        }
      }
    }
  }
}
`

export const QUERY_PRODUCT = `
query($id:String!,$pId:ID!){
  products(page:1,pageSize:10,term:$id){
    items{
      id
      name
      skus{
        skuName
        id
      }
    }
  }
  product(identifier:{field:id,value:$pId}){
    categoryId
  }
}
`
export const GET_PRODUCTS_BY_CATEGORY = `
query($category:ID!,$page:Int!, $search:String!,$pageSize:Int!){
  products(filters:{categoryId:$category}page:$page,pageSize:$pageSize,term:$search){
    paging{
      page
      pages
      perPage
      total
    }
    items{
      id
      name
      imageUrl
    }
  } 
}
`