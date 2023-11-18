import { warn } from 'console'
import { basicNotify } from './notifications'

type TabEffect =
  | 'ACTIVATED'
  | 'ATTACHED'
  | 'CREATED'
  | 'DETACHED'
  | 'MOVED'
  | 'REMOVED'
  | 'UPDATED:LOADING'
  | 'UPDATED:COMPLETE'

type TabEffectInfo =
  | chrome.tabs.TabActiveInfo
  | chrome.tabs.TabAttachInfo
  | chrome.tabs.TabDetachInfo
  | chrome.tabs.TabMoveInfo
  | chrome.tabs.TabRemoveInfo
  | chrome.tabs.TabChangeInfo

export const handleTabEffect = async (
  effect: TabEffect,
  tabId: number,
  info?: TabEffectInfo,
  old?: chrome.tabs.Tab,
) => {
  let tab: chrome.tabs.Tab | null = null
  let window: chrome.windows.Window | null = null
  try {
    tab = await chrome.tabs.get(tabId)
  } catch (e) {
    console.warn('cannot find the tab', tabId)
  }

  if (tab) {
    try {
      window = await chrome.windows.get(tab.windowId)
    } catch (e) {
      console.warn('cannot find the window', tab.windowId)
    }
  }

  console.log(effect, { tab, window }, { info, old })

  // regroup tabs
  switch (effect) {
    case 'ACTIVATED':
      // push relevance meta data to the popup
      break
    case 'ATTACHED':
      break
    case 'DETACHED':
      break
    case 'MOVED':
      // check right window, group, position
      break
    case 'CREATED':
      break
    case 'REMOVED':
      cleanTabAgeStore(tabId)
      break
    case 'UPDATED:LOADING':
      // move tab to right window, group, position
      break
    case 'UPDATED:COMPLETE':
      // handle duplicate tab
      await updateTabAgeStore(tab)
      await handleDuplicateTabs(tab)
      await archiveInnactiveTabs(tab)
      break
  }

  // log storage session
  const storage = await chrome.storage.session.get()
  console.log('storage', storage)
}

const handleDuplicateTabs = async (tab: chrome.tabs.Tab) => {
  // get all tabs with same url
  const tabs = await chrome.tabs.query({
    url: tab.url,
  })

  // close previous tabs except current tab
  const previousTabs = tabs.filter(t => t.id !== tab.id)
  for (const t of previousTabs) {
    await chrome.tabs.remove(t.id)
  }

  // notify user about removde duplicate tabs
  if (previousTabs.length > 0) {
    await basicNotify(
      'Duplicate tabs removed',
      `Removed ${previousTabs.length} duplicate tabs`,
    )
  }
}

const updateTabAgeStore = async (tab: chrome.tabs.Tab) => {
  const now = Date.now()
  const host = new URL(tab.url).host
  const key = `tab:${tab.id}:age`
  const ageRecord = await chrome.storage.session.get(key)
  let created = now
  if (ageRecord[key]) {
    const { created: oldCreated } = ageRecord[key]
    created = oldCreated
  }

  if (isHostIgnored(host)) {
    return
  }
  await chrome.storage.session.set({
    [key]: {
      host,
      created,
      lastActive: now,
    },
  })
}

const cleanTabAgeStore = async (tabId: number) => {
  await chrome.storage.session.remove([`tab:${tabId}:age`])
}

/**
 * purpose: to prevent too many tabs in one window
 * @param tab created tab or attached tab
 */
const archiveInnactiveTabs = async (tab: chrome.tabs.Tab) => {
  const allWindows = await chrome.windows.getAll()
  const window = await chrome.windows.get(tab.windowId)

  // get all tabs in all windows
  const allTabs = await chrome.tabs.query({})

  // get all tabs in current window
  const currentTabs = allTabs.filter(t => t.windowId === tab.windowId)

  // get all tabs in all windows except current window
  const otherTabs = allTabs.filter(t => t.windowId !== tab.windowId)

  console.log({ allTabs, currentTabs, otherTabs })
}

const isHostIgnored = (host: string) => {
  return !host.includes('.')
}
