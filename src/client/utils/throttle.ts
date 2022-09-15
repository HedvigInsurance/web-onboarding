/**
 * Throttle a function to run at most once every N milliseconds
 * @param fn Function to be throttled
 * @param timeout The timeout before allowing the function to execute again in milliseconds
 * @returns A throttled function
 */
export const throttle = (fn: () => void, timeout: number) => {
  let waiting = false

  return () => {
    if (waiting) return

    waiting = true
    fn()
    setTimeout(() => {
      waiting = false
    }, timeout)
  }
}
