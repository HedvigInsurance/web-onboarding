import { MockStorage } from 'utils/storage/MockStorage'
import { createSession, KA_SESSION_KEY, SESSION_KEY } from './sessionStorage'

it('gets and sets sessions', () => {
  const storage = new MockStorage({
    [SESSION_KEY]: '{"hello":"world"}',
  })
  const session = createSession(storage)
  expect(session.getSession()).toEqual({ hello: 'world' })
  session.setSession({ hello: 'you' })
  expect(session.getSession()).toEqual({ hello: 'you' })
})

it('keeps session alive and expires once it times out', () => {
  const storage = new MockStorage({
    [SESSION_KEY]: '{"hello":"world"}',
    [KA_SESSION_KEY]: Date.now(),
  })
  const session = createSession(storage)
  expect(session.getSession()).toEqual({ hello: 'world' })

  const storage2 = new MockStorage({
    [SESSION_KEY]: '{"hello":"world"}',
    [KA_SESSION_KEY]: Date.now() - (30 * 60 * 1000 + 1),
  })
  const expiredSession = createSession(storage2)
  expect(expiredSession.getSession()).toEqual({})

  expiredSession.keepAlive()
  expect(expiredSession.getSession()).toEqual({})
})
