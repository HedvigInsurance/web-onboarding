export interface Timer {
  state: { isAborted: boolean; hasFinished: boolean }
  abort: () => void
}
export const createTimer = (time: number) => (callback: { (): void }) => {
  const state = { isAborted: false, hasFinished: false }
  const timerId = setTimeout(() => {
    state.hasFinished = true
    callback()
  }, time)

  return {
    state,
    abort: () => {
      if (state.isAborted || state.hasFinished) {
        return
      }

      state.isAborted = true
      clearTimeout(timerId)
    },
  }
}
