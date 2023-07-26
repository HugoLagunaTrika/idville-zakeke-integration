import {
    Apps,
    ExternalClient,
    InstanceOptions,
    IOContext,
} from '@vtex/api'
import { ZakekeToken } from '../typings/results/zakekeToken'
import { configuration } from '../typings/types/configuration'

export default class Zakeke extends ExternalClient {
    public credentials?: {
        secretKey: string
        clientID: string
    }
    constructor(context: IOContext, options?: InstanceOptions) {
        super(`https://api.zakeke.com`, context, {
            ...options,
        })
    }

    private async getCredentials(vtex: IOContext) {
        const apps = new Apps(vtex)
        const appId = process.env.VTEX_APP_ID as string
        const settings: configuration = await apps.getAppSettings(appId)

        this.credentials = {
            clientID: settings.zakekeCredentials.clientId,
            secretKey: settings.zakekeCredentials.secretKey
        }
    }

    public async generateToken(customercode?:string,visitorcode?:string){
        if (!this.credentials) {
            await this.getCredentials(this.context)
        }
        const form:URLSearchParams = new URLSearchParams();
        form.append('grant_type', 'client_credentials');
        form.append('access_type', 'S2S');
        if(customercode){
            form.append('customercode', customercode);
        }
        if(visitorcode){
            form.append('visitorcode', visitorcode);
        }
        return await this.http.post<ZakekeToken>('/token', form,{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            auth: {
                username: this.credentials?.clientID || '',
                password: this.credentials?.secretKey || ''
            }
        })
    }

}