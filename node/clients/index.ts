import { IOClients } from '@vtex/api'
import { CatalogClient } from './catalog'
import logistics from './logistic'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get catalogClient() {
    return this.getOrSet('searchClient', CatalogClient)
  }

  public get logisticsClient() {
    return this.getOrSet('logisticsClient', logistics)
  }
}
