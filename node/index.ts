import type {
  ClientsConfig,
  ServiceContext,
  RecorderState,
} from '@vtex/api'
import { LRUCache, Service, method } from '@vtex/api'

import { Clients } from './clients'
import { 
  configuratorDelete,
  configuratorSave
} from './middleware'
import { addToCart } from './middleware/addToCart'
import { catalog } from './middleware/catalog'
import { editProductCart } from './middleware/editProductInCart'
import { item } from './middleware/options'
import { optionsRes } from './middleware/optionsRes'
import { productInfo } from './middleware/ProductInfo'
import { zakekeToken } from './middleware/zakekeToken'

const TIMEOUT_MS = 15000
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>
  interface State extends RecorderState {
    product_code: string
  }
}


// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    catalog: method({
      GET: [catalog],
    }),
    item: method({
      GET: [item],
    }),
    configurator: method({
      POST: [configuratorSave],
      DELETE: [configuratorDelete],
    }),
    productInfo: method({
      POST: [productInfo],
      OPTIONS: [optionsRes],
    }),
    addTocart: method({
      POST: [addToCart],
      OPTIONS: [optionsRes],
    }),
    editCart: method({
      POST: [editProductCart],
      OPTIONS: [optionsRes],
    }),
    getZakekeToken: method({
      POST:[zakekeToken],
      OPTIONS: [optionsRes],
    }),
  },
})
