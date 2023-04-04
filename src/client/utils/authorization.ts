export const getAuthorizationHeader = (authToken: string): string => {
  return `Bearer ${authToken}`
}
