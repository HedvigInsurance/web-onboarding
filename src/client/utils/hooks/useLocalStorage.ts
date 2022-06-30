import { useState } from 'react'

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
  localStorage.setItem(key, JSON.stringify(value))

  return [value, setValue]
}
