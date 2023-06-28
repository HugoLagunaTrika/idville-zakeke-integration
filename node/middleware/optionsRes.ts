export async function optionsRes(ctx: Context, next: () => Promise<any>) {
    console.log("OPTIONS RES");
    ctx.set('Content-Type', 'application/json')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Cache-Control', 'private')
    ctx.set('Access-Control-Allow-Headers', '*')
    ctx.status = 200
    await next();
}