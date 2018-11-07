import { createSession, KA_SESSION_KEY, SESSION_KEY } from './sessionStorage'
import { MockStorage } from './storage/MockStorage'

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
    [KA_SESSION_KEY]: Date.now() - 31 * 60 * 1000,
  })
  const expiredSession = createSession(storage2)
  expect(expiredSession.getSession()).toEqual({})

  expiredSession.keepAlive()
  expect(expiredSession.getSession()).toEqual({})

  const storage3 = new MockStorage({
    [SESSION_KEY]: '{"hello":"world"}',
    [KA_SESSION_KEY]: Date.now() - 31 * 60 * 1000,
  })
  const expiredSession2 = createSession(storage3)
  expiredSession2.keepAlive()

  expect(expiredSession2.getSession()).toEqual({ hello: 'world' })
})
