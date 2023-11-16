import { isNil } from 'lodash'

const handleNotifyResponse = ID => res => {
  const error = chrome.runtime.lastError
  if (!isNil(error)) {
    console.error(ID, 'Last error:', error, res)
  } else {
    console.log(ID)
  }
}

export const basicNotify = async (
  title: string,
  message: string,
  id?: string,
) => {
  const ID = isNil(id) ? `CD:Notify:${Date.now()}` : id
  await chrome.notifications.create(
    ID,
    {
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icon-128.png'),
      title,
      message,
    },
    handleNotifyResponse(ID),
  )
}

export const listNotify = async (
  title: string,
  message: string,
  items: chrome.notifications.ItemOptions[],
  id?: string,
) => {
  const ID = isNil(id) ? `CD:Notify:${Date.now()}` : id
  await chrome.notifications.create(
    ID,
    {
      type: 'list',
      iconUrl: chrome.runtime.getURL('icon-128.png'),
      title,
      message,
      items,
    },
    handleNotifyResponse(ID),
  )
}
