import { MemberQuery } from 'data/graphql'

export interface AVYWindow extends Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void
  }
}
export const handleSignedEvent = (member: MemberQuery['member'] | null) => {
  const message = JSON.stringify({
    event: 'Signed',
    payload: { memberId: member?.id },
  })
  const avyWindow = window as AVYWindow
  avyWindow.frames.parent.postMessage(message, '*')
  if (avyWindow.ReactNativeWebView) {
    avyWindow.ReactNativeWebView.postMessage(message)
  }
}
