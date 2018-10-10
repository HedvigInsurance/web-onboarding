export const mockNetworkWait = (delay: number = 0) =>
  new Promise((resolve) => setTimeout(() => resolve(), delay))
