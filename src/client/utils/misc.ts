export const sleep = (delay: number = 0) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), delay))

export const nextTickAsync = () =>
  new Promise<void>((resolve) => process.nextTick(resolve))

export const stripTrailingCharacter = (character: string, str: string) => {
  return str.replace(RegExp(`${character}+$`, 'i'), '')
}
