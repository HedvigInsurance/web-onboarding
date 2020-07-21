export const afterTick = (f: () => void) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      f()
      resolve()
    }, 0)
  })
}
