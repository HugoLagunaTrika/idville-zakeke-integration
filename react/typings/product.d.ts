type ProductSpecification = {
  name: string
  originalName: string
  values: string[]
}
interface ProductAndQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Record<string, any>
  product: MaybeProduct
}

type GroupId = string

interface AssemblyOptionItem {
  id: string
  quantity: number
  seller: string
  initialQuantity: number
  choiceType: string
  name: string
  price: number
  children: Record<string, AssemblyOptionItem[]> | null
}

interface BuyButtonContextState {
  clicked: boolean
}

interface SkuSelectorContextState {
  selectedImageVariationSKU: string | null
  isVisible: boolean
  areAllVariationsSelected: boolean
}

interface ProductContextState {
  loadingItem: boolean
  selectedItem?: Item | null
  product: Product | null
  selectedQuantity: number
  skuSelector: Partial<SkuSelectorContextState>
  buyButton: BuyButtonContextState
  assemblyOptions: {
    items: Record<GroupId, AssemblyOptionItem[]>
    inputValues: Record<GroupId, InputValues>
    areGroupsValid: Record<GroupId, boolean>
  }
}

/** @deprecated Use `ProductSpecification` */
type SpecificationGroupItem = ProductSpecification

type SpecificationGroup = {
  name: string
  originalName: string
  specifications: ProductSpecification[]
}

type Product = {
  brand: string
  brandId: string
  cacheId: string
  categories: string[]
  categoriesIds: string[]
  categoryId: string
  categoryTree: Array<{ id: string; name: string; href: string }>
  clusterHighlights: Array<{ id: string; name: string }>
  description: string
  itemMetadata: ItemMetadata
  items: Item[]
  sku?: SKU
  link: string
  linkText: string
  metaTagDescription: string
  priceRange: {
    sellingPrice: { highPrice: number; lowPrice: number }
    listPrice: { highPrice: number; lowPrice: number }
  }
  productClusters: Array<{ id: string; name: string }>
  productId: string
  productName: string
  productReference: string
  properties: ProductSpecification[]
  skuSpecifications: SkuSpecification[]
  specificationGroups: SpecificationGroup[]
  titleTag: string
}

type SKU = Item<{
  images: ImagesMap[]
  referenceId: Array<{ Key: string; Value: string }>
}>

type ImagesMap = {
  imageUrl: string | undefined
}

type Item = {
  complementName: string
  ean: string
  images: Array<{
    imageId: string
    imageLabel: string
    imageTag: string
    imageUrl: string
    imageText: string
  }>
  itemId: string
  measurementUnit: string
  name: string
  nameComplete: string
  referenceId: Array<{ Key: string; Value: string }>
  sellers: Seller[]
  unitMultiplier: number
  variations: Array<{ name: string; values: string[] }>
  videos: Array<{ videoUrl: string }>
}

type SkuSpecification = {
  field: SkuSpecificationField
  values: SkuSpecificationValues[]
}

type SkuSpecificationField = {
  name: string
}

type SkuSpecificationValues = {
  name: string
}

type Seller = {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommercialOffer
}

type TeaserCondition = {
  minimumQuantity: number
  parameters: Array<{
    name: string
    value: string
  }>
}

type TeaserEffects = {
  parameters: Array<{
    name: string
    value: string
  }>
}

type Teaser = {
  name: string
  conditions: TeaserCondition
  effects: TeaserEffects
}

type CommercialOffer = {
  Installments: Installment[]
  discountHighlights: Array<{ name: string }>
  teasers: Teaser[]
  Price: number
  ListPrice: number
  spotPrice: number
  SellingPrice?: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  Tax: number
  taxPercentage: number
  CacheVersionUsedToCallCheckout: string
}

type Installment = {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

type ItemMetadata = {
  items: Array<{
    id: string
    name: string
    imageUrl: string
    seller: string
    assemblyOptions: Array<{
      id: string
      name: string
      required: boolean
      inputValues: InputValue[]
      composition: Composition | null
    }>
  }>
  priceTable: Array<{
    type: string
    values: Array<{ id: string; assemblyId: string; price: number | null }>
  }>
}

type InputValue = TextInputValue | BooleanInputValue | OptionsInputValue

const enum InputValueType {
  'TEXT' = 'TEXT',
  'BOOLEAN' = 'BOOLEAN',
  'OPTIONS' = 'OPTIONS',
}

type TextInputValue = {
  type: InputValueType.TEXT
  defaultValue: ''
  label: string
  maxLength: number
  domain: null
}

type BooleanInputValue = {
  type: InputValueType.BOOLEAN
  defaultValue: boolean
  label: string
  maxLength: null
  domain: null
}

type OptionsInputValue = {
  type: InputValueType.OPTIONS
  defaultValue: string
  label: string
  maxLength: null
  domain: string[]
}

type Composition = {
  minQuantity: number
  maxQuantity: number
  items: Array<{
    id: string
    minQuantity: number
    maxQuantity: number
    priceTable: string
    seller: string
    initialQuantity: number
  }>
}
