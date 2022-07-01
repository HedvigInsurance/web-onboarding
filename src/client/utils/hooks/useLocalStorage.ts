import { useState, useCallback } from 'react'

function getStorageValue(key: string, defaultValue: string | boolean) {
  // getting stored value
  const saved = localStorage.getItem(key)
  const initial = saved && JSON.parse(saved)
  return initial || defaultValue
}

export const useLocalStorage = (
  key: string,
  defaultValue: string | boolean,
) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  const handleSetValue = useCallback(
    (newValue: string | boolean) => {
      setValue(newValue)
      if (newValue === '') {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    },
    [key],
  )

  return [value, handleSetValue]
}
