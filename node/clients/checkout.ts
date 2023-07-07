import {
    ExternalClient,
    InstanceOptions,
    IOContext,
} from '@vtex/api'
import { Inventory } from '../typings/results/inventory'
import { CartItem } from '../typings/types/cartItems'

export default class Checkout extends ExternalClient {
    public credentials?: {
        API_KEY: string
        API_TOKEN: string
    }
    constructor(context: IOContext, options?: InstanceOptions) {
        super(`https://${context.account}.vtexcommercestable.com.br`, context, {
            ...options,
            headers: {
                ...(options && options.headers),
                Accept: 'application/vnd.vtex.ds.v10+json',
            },
        })
    }

    public async cartSimulation(item: any): Promise<any> {
        return this.http.post<Inventory>(`/api/checkout/pub/orderForms/simulation?RnbBehavior=0`,
            {
                items: [item],
                "country": "USA"
            }
            , {
                headers: {
                    VtexIdclientAutCookie: this.context.adminUserAuthToken
                        ? this.context.adminUserAuthToken
                        : this.context.authToken,
                },
            })
    }

    public async addToCart(item: CartItem[], orderFormId: string): Promise<any> {
        return this.http.post(`/api/checkout/pub/orderForm/${orderFormId}/items?allowOutdatedData=paymentData`,
            {
                orderItems: item
            }
            , {
                headers: {
                    VtexIdclientAutCookie: this.context.adminUserAuthToken
                        ? this.context.adminUserAuthToken
                        : this.context.authToken,
                },
            })
    }

    public async getCart(orderFormId: string): Promise<any> {
        return this.http.get(`/api/checkout/pub/orderForm/${orderFormId}?refreshOutdatedData=true`,
            {
                headers: {
                    VtexIdclientAutCookie: this.context.adminUserAuthToken
                        ? this.context.adminUserAuthToken
                        : this.context.authToken,
                },
            })
    }

    public async removeItems(orderFormId: string): Promise<any> {
        return this.http.post(`/api/checkout/pub/orderForm/${orderFormId}/items/removeAll`, null,
            {
                headers: {
                    VtexIdclientAutCookie: this.context.adminUserAuthToken
                        ? this.context.adminUserAuthToken
                        : this.context.authToken,
                },
            })
    }
}