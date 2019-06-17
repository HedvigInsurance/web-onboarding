export const getFirebaseLinkDomain = () => {
  if (
    typeof window !== 'undefined' &&
    (window as any).FIREBASE_LINK_DOMAIN !== undefined
  ) {
    return (window as any).FIREBASE_LINK_DOMAIN
  } else if (process.env.NODE_ENV === 'development') {
    return process.env.FIREBASE_LINK_DOMAIN || 'https://hedvigtest.page.link'
  } else if (
    process.env.NODE_ENV !== 'development' &&
    process.env.FIREBASE_LINK_DOMAIN
  ) {
    return process.env.FIREBASE_LINK_DOMAIN
  } else {
    throw Error(
      'Unable to find firebase link domain - specify with envvar `FIREBASE_LINK_DOMAIN`',
    )
  }
}
