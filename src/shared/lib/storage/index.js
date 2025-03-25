export const fromStoredData = storageData => JSON.parse(storageData)

export const toStoredData = data => JSON.stringify(data)

export const getStorageData = key => {
  const storedData = localStorage.getItem(key)
  return storedData ? fromStoredData(storedData) : null
}

export const setStorageData = (key, data) => localStorage.setItem(key, toStoredData(data))

export const removeStorageData = key => localStorage.removeItem(key)
