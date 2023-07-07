export interface configuration {
    customizableCategories: customizableCategory[],
    domain: string,
}

export interface customizableCategory {
    categoryId: number
    personalization:string
}