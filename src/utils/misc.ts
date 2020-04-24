export const sleep = (delay: number = 0) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), delay))
