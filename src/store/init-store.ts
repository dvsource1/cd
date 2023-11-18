export enum StoreKey {
  HOSTS = 'hosts',
  APIS = 'apis',
}

export enum APIKey {
  UNSPLASH = 'UNSPLASH',
  NOTION = 'NOTION',
}

const initStores = () => {
  // init chrome local storage with default values
  chrome.storage.local.get(null, async storage => {
    if (Object.keys(storage).length === 0) {
      await chrome.storage.local.set({
        [StoreKey.HOSTS]: getDefaultHosts(),
        [StoreKey.APIS]: {
          [APIKey.UNSPLASH]: {
            key: '',
          },
          [APIKey.NOTION]: {
            key: '',
            secret: '',
          },
        },
      })
    }
  })
}

const getDefaultHosts = () => {
  return [
    {
      host: 'www.google.com',
      ignoreDuplicate: true,
    },
  ]
}

export default initStores
