export const mockNetworkWait = (delay: number = 0) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), delay))
