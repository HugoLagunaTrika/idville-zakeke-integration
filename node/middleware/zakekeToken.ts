import { json } from "co-body"
import { configuration } from "../typings/types/configuration";


export async function zakekeToken(ctx: Context, next: () => Promise<any>) {
    ctx.set('Content-Type', 'application/json')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Cache-Control', 'private')
    ctx.set('Access-Control-Allow-Headers', '*')

    const {
        clients: { zakekeClient, apps },
        request:{
            headers:{
                origin
            }
        }
    } = ctx

    const body = await json(ctx.req)

    console.log(origin);

    const app: string = process.env.VTEX_APP_ID ?? ''

    const settings: configuration = await apps.getAppSettings(app)

    const allowedOrigins = settings.zakekeCredentials.allowedOrigins

    if (!origin || !allowedOrigins.includes(origin)) {
        ctx.status = 400
        ctx.body = {
            "message": "origin not allowed"
        }
        return
    }


    if (!body || (!body.customercode && !body.visitorcode)) {
        ctx.status = 400
        ctx.body = {
            "message": "customercode or visitorcode are required"
        }
        return
    }

    try {
        const tokenRes = await zakekeClient.generateToken(body.customercode, body.visitorcode)
        if (tokenRes.access_token) {
            ctx.body = tokenRes
        }
        ctx.status = 200
    } catch (error) {
        ctx.status = 400
        ctx.body = {
            "message": error.message
        }
    }

    await next();
}