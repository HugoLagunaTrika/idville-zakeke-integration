import {
    ExternalClient,
    InstanceOptions,
    IOContext,
} from '@vtex/api'
import { Inventory } from '../typings/results/inventory'

export default class logistics extends ExternalClient {
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

    public async getInventory(skuId: string): Promise<Inventory> {
        return this.http.get<Inventory>(`/api/logistics/pvt/inventory/skus/${skuId}`, {
            headers: {
                VtexIdclientAutCookie: this.context.adminUserAuthToken
                    ? this.context.adminUserAuthToken
                    : this.context.authToken,
            },
        })
    }
}