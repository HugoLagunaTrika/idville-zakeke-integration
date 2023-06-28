export async function configuratorDelete(ctx: Context, next: () => Promise<any>) {
  try {
    const {
      vtex: {
        route: { params },
      },
      clients: {
        masterdata
      }
    } = ctx
    console.log(params)
    await masterdata.createOrUpdateEntireDocument({
      dataEntity:"zakeke",
      id:params.product as string,
      fields:{
        active:false,
        product:params.product as string
      },
      schema:"default"
    })
    ctx.status = 200
    ctx.body = {
      response: "ok"
    }
    await next()
  } catch (error) {
    console.error("ERROR")

    const { response: { status } } = error;
    ctx.status = parseInt(status)
    ctx.body = {
      response: "error"
    }
  }
}

export async function configuratorSave(ctx: Context, next: () => Promise<any>) {
  console.log("SAVE")
  try {
    const {
      vtex: {
        route: { params },
      },
      clients:{masterdata}
    } = ctx

    console.log(params)
    await masterdata.createOrUpdateEntireDocument({
      dataEntity:"zakeke",
      id:params.product as string,
      fields:{
        active:true,
        product:params.product as string
      },
      schema:"default"
    })

    ctx.status = 200
    ctx.body = {
      response: "ok"
    }
    await next()
  } catch (error) {
    console.error("ERROR")

    const { response: { status } } = error;
    if(status == 304){
      ctx.status = 200
      ctx.body = {
        response: "ok"
      }
      return
    }
    ctx.status = parseInt(status)
    ctx.body = {
      response: "error"
    }
  }
}

