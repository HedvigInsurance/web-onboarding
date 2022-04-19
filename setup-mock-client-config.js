window.hedvigClientConfig = {
  giraffeWsEndpoint: 'wss://graphql.dev.hedvigit.com/subscriptions',
}
window.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  }),
)
