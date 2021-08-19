export const stripTrailingCharacter = (character: string, str: string) => {
  return str.replace(RegExp(`${character}+$`, 'i'), '')
}
