export const toStoredData = data => JSON.stringify(data)

export const getStorageData = key => {
  const storedData = localStorage.getItem(key)
  return storedData ?? null
}

export const setStorageData = (key, data) => localStorage.setItem(key, toStoredData(data))

export const removeStorageData = key => localStorage.removeItem(key)

export const ACCESS_TOKEN_KEY = 'access_token'
