import { useState, useEffect } from 'react'

// Reference: https://usehooks.com/useDebounce/
export const useDebounce = <ValueType = unknown>(
  value: ValueType,
  delay: number,
) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
