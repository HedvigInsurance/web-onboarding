export const notNullable = <T>(thing?: T | null): T => {
  if (thing === undefined || thing === null) {
    throw new Error(`Expected thing to be not nullable but was ${typeof thing}`)
  }

  return thing
}
