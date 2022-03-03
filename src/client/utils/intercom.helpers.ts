export const openIntercomChat = () => {
  if (typeof Intercom === 'undefined') {
    return
  }
  return Intercom('show')
}
