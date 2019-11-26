export const notNullable = <T>(thing?: T | null): T => {
  if (thing === undefined || thing === null) {
    throw new Error(`Expected thing to be not nullable but was ${typeof thing}`)
  }

  return thing
}

const chunkArray = <T>(array: T[], size: number): T[][] =>
  array.reduce(
    (chunks, _, idx, arr) =>
      idx % size === 0 ? [...chunks, arr.slice(idx, idx + size)] : chunks,
    [],
  )
