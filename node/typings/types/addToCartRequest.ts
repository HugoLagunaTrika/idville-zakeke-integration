
export interface AddToCartRequest {
    productid: string;
    quantity: number;
    designid: string;
    selectedattributes: any[] | any;
    additionaldata: {
        orderFormId: string;
    };
}

