export interface configuration {
    customizableCategories: customizableCategory[],
    domain: string,
    zakekeCredentials: zakekeCredentials,
}

export interface customizableCategory {
    categoryId: number
    personalization:string
}

export interface zakekeCredentials {
    clientId: string
    secretKey: string
    allowedOrigins: string
}