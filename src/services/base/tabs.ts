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
    return
  }

  try {
    window = await chrome.windows.get(tab.windowId)
  } catch (e) {
    return
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
      break
    case 'UPDATED:LOADING':
      // move tab to right window, group, position
      break
    case 'UPDATED:COMPLETE':
      // handle duplicate tab
      handleDuplicateTabs(tab)
      break
  }
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
