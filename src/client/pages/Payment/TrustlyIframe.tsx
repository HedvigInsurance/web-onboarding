import React, { useEffect, ReactEventHandler } from 'react'
import styled from '@emotion/styled'
import { SUCCESS_SUFFIX, FAIL_SUFFIX } from './Payment.constants'

type TrustlyIframeProps = {
  url: string
  onSuccess: () => void
  onFail: () => void
}

export const TrustlyIframe = (props: TrustlyIframeProps) => {
  const { url, onSuccess, onFail } = props

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const trustlyOrigin = new URL(url).origin
      if (event.origin !== trustlyOrigin) return

      const message = JSON.parse(event.data)
      if (message.method === 'OPEN_APP') {
        window.location.assign(message.appURL)
      }
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [url])

  const handleLoad: ReactEventHandler<HTMLIFrameElement> = (event) => {
    const pathname = event.currentTarget.contentWindow?.location.pathname
    if (pathname?.endsWith(SUCCESS_SUFFIX)) {
      onSuccess()
    }

    if (pathname?.endsWith(FAIL_SUFFIX)) {
      onFail()
    }
  }

  return <Iframe src={url} onLoad={handleLoad} />
}

const Iframe = styled.iframe({
  width: '100%',
  minHeight: '500px',
  height: 'calc(100vh - 2rem)',
  maxHeight: '798px',
  border: 'none',
})
