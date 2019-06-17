export const getFirebaseLinkDomain = () => {
  if (
    typeof window !== 'undefined' &&
    (window as any).FIREBASE_LINK_DOMAIN !== undefined
  ) {
    return (window as any).FIREBASE_LINK_DOMAIN
  } else if (process.env.FIREBASE_LINK_DOMAIN) {
    return process.env.FIREBASE_LINK_DOMAIN
  } else {
    console.error(JSON.stringify(process.env))
    throw Error(
      'Unable to find firebase link domain - specify with envvar `FIREBASE_LINK_DOMAIN`',
    )
  }
}
