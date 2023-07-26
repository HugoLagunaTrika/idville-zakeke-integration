export interface SearchParams {
  queryKey: string
  queryFullText: string
  queryMap: string
  queryFrom: number
  queryTo: number
  queryOrderBy: string
  queryFacets: { key: string; value: string }[]
}
