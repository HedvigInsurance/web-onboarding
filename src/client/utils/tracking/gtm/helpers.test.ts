import { hashValue } from './helpers'

it('return SHA-256 hashed string', () => {
  hashValue('Valéry').then((hex) =>
    expect(hex).toBe(
      '6915771be1c5aa0c886870b6951b03d7eafc121fea0e80a5ea83beb7c449f4ec',
    ),
  )
})
