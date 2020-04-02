export const getGiraffeEndpoint = (
  constant:
    | 'GIRAFFE_ENDPOINT'
    | 'GIRAFFE_WS_ENDPOINT'
    | 'CONTENT_SERVICE_ENDPOINT',
  defaultEndpoint: string,
) => {
  if (
    typeof window !== 'undefined' &&
    (window as any)[constant] !== undefined
  ) {
    return (window as any)[constant]
  } else if (process.env.NODE_ENV === 'development') {
    return process.env[constant] || defaultEndpoint
  } else if (process.env.NODE_ENV !== 'development' && !process.env[constant]) {
    throw new Error('Unable to find giraffe endpoint 🦒')
  } else {
    return process.env[constant]!
  }
}
