export const openIntercomChat = () => {
  if (typeof Intercom === 'undefined') {
    return
  }
  Intercom('show')
}

export const hideIntercomLauncher = () => {
  if (typeof Intercom === 'undefined') {
    return
  }
  Intercom('update', { hide_default_launcher: true })
}
