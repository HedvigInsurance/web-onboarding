export const logInDev = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args) // tslint:disable-line
  }
}
