import { MemberQuery } from 'data/graphql'

export interface AWYWindow extends Window {
  ReactNativeWebView?: {
    postMessage: (message: string, targetOrigin: string) => void
  }
}
export const handleSignedEvent = (member: MemberQuery['member'] | null) => {
  const message = JSON.stringify({
    event: 'Signed',
    payload: { memberId: member?.id },
  })
  const awyWindow = window as AWYWindow
  awyWindow.frames.parent.postMessage(message, '*')
  if (awyWindow.ReactNativeWebView) {
    awyWindow.ReactNativeWebView.postMessage(message, '*')
  }
}
