import { createTimer } from './timer'

jest.useFakeTimers()

it('runs a timer', () => {
  const callback = jest.fn()
  const timer = createTimer(100)(callback)

  expect(timer.state.hasFinished).toBe(false)
  expect(timer.state.isAborted).toBe(false)

  jest.runAllTimers()

  expect(timer.state.hasFinished).toBe(true)
  expect(callback).toHaveBeenCalled()
})

it('aborts a timer', () => {
  const callback = jest.fn()
  const timer = createTimer(100)(callback)

  timer.abort()
  jest.runAllTimers()

  expect(timer.state.hasFinished).toBe(false)
  expect(timer.state.isAborted).toBe(true)
  expect(callback).not.toHaveBeenCalled()
})
