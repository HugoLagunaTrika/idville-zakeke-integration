/* eslint-disable vtex/prefer-early-return */
/* eslint-disable @typescript-eslint/naming-convention */
import type { FC, ReactChild } from 'react'
import React, { useEffect, useState } from 'react'
import { canUseDOM } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'

import { zakekeContainerStyles } from './zakekepdp.css'

interface ScripstJsProps {
  children: ReactChild
  merchant: string
}

const ScripstJs: FC<ScripstJsProps> = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  let mobile: boolean
  const { isMobile } = useDevice()

  useEffect(() => {
    if (!canUseDOM) {
      return
    }

    if (document.getElementById('script-zakeke')) {
      setIsScriptLoaded(true)

      return
    }

    const id = '564'
    const name = '3/4 Poly-Satin Dye-Sub Custom Lanyard - Metal Bulldog Clip'

    if (isMobile) {
      mobile = true
    }

    const config = {
      tokenoauth:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU2VsbGVyIiwiUGVybUJpdHMiOiIwMTAwMTExMDAxMTAwMTExMTExMTAxIiwidW5pcXVlX25hbWUiOiJjcGhpbGxpcEBpZHZpbGxlLmNvbSIsIlVzZXJJRCI6IjExNDA3MSIsIlVzZXJOYW1lIjoiY3BoaWxsaXBAaWR2aWxsZS5jb20iLCJzYWxlc0NoYW5uZWxJRCI6IjEiLCJlbWFpbCI6InBwY0BpZHZpbGxlLmNvbSIsIlVzZXJUeXBlSUQiOiIzIiwiSXNzdWVEYXRlIjoiMjEtMDYtMjAyMyAxNi0wOS0zN1oiLCJVc2VyVmVyc2lvbiI6IjIwMjMwNjIxMTQxODM5IiwiY2xpZW50SUQiOiIxMzExMzQiLCJuYmYiOjE2ODczNjM3NzcsImV4cCI6MTY4NzQ1MDE3NywiaWF0IjoxNjg3MzYzNzc3LCJpc3MiOiJ3d3cuemFrZWtlLmNvbSIsImF1ZCI6Imh0dHBzOi8vd3d3Lnpha2VrZS5jb20ifQ.xbELB3Kr9kdBkfpbNgVvt41bN_QtOZyctZVW9p7bIgM',
      mobileversion: mobile,
      culture: 'en-US',
      currency: 'USD',
      designid: '564',
      pricetaxincluded: true,
      labeltax: 'hidden',
      productinfourl: 'https://productinfo.free.beeceptor.com',
      quantity: 1,
      selectedattributes: {
        '845': 'Black',
        '846': 'Burgandy',
        '847': 'Dark Gray',
      },
    }

    const config_2 = JSON.stringify(config)

    const scriptContent = `var customizer = new zakekeDesigner(${config_2},{ "id": "${id}",
    "name": "${name}"});`

    const script = document.createElement('script')
    const script_2 = document.createElement('script')

    script.src = `https://portal.zakeke.com/scripts/config.js`
    script.id = 'script-zakeke'
    script_2.src = `https://portal.zakeke.com/scripts/integration/api/customizer.js`

    script_2.onload = () => {
      setIsScriptLoaded(true)
    }

    window?.document.querySelector('head')?.appendChild(script)
    window?.document.querySelector('head')?.appendChild(script_2)

    const observer = new MutationObserver(() => {
      const container = document.getElementById('zakeke-container')

      if (container) {
        observer.disconnect()
        const script_3 = document.createElement('script')

        script_3.id = 'script-zakeke-export'
        script_3.innerHTML = scriptContent
        window?.document.querySelector('head')?.appendChild(script_3)
      }
    })

    observer.observe(document, { childList: true, subtree: true })
  }, [isScriptLoaded, canUseDOM])

  if (!isScriptLoaded) {
    return null
  }

  return (
    <>
      <div className={`${zakekeContainerStyles}`} id="zakeke-container"></div>
    </>
  )
}

export default ScripstJs
