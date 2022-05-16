export interface AVYWindow extends Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void
  }
}
export const handleSignedEvent = (memberId: string | null) => {
  const message = JSON.stringify({
    event: 'Signed',
    payload: { memberId },
  })
  const avyWindow = window as AVYWindow
  avyWindow.frames.parent.postMessage(message, '*')
  if (avyWindow.ReactNativeWebView) {
    avyWindow.ReactNativeWebView.postMessage(message)
  }
}
