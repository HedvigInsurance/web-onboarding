import { createSession, SESSION_KEY } from './sessionStorage'
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
