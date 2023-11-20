interface TabGroupConfig {
  name: string
  color: chrome.tabGroups.ColorEnum
  urlMather: ((url: string) => boolean) | string
}

const TAB_GROUP_CONFIG: TabGroupConfig[] = [
  {
    name: 'LOCAL',
    color: 'red',
    urlMather: url => new URL(url).host === '127.0.0.1:8000',
  },
  {
    name: 'DEV 6',
    color: 'blue',
    urlMather: url => new URL(url).host === 'dev6.matific.com',
  },
  {
    name: 'DEV 3',
    color: 'green',
    urlMather: url => new URL(url).host === 'dev3.matific.com',
  },
  {
    name: 'STAGING',
    color: 'yellow',
    urlMather: url => new URL(url).host === 'staging.matific.com',
  },
  {
    name: 'PRODUCTION',
    color: 'purple',
    urlMather: url => new URL(url).host === 'matific.com',
  },
]

const matchTab = (tab: chrome.tabs.Tab, config: TabGroupConfig): boolean => {
  if (typeof config.urlMather === 'string') {
    return tab.url === config.urlMather
  }
  return config.urlMather(tab.url)
}

const groupTabs = async (tab: chrome.tabs.Tab): Promise<void> => {
  console.log('groupTabs', tab)

  // get current window
  const window = await chrome.windows.get(tab.windowId, { populate: true })

  // get all tabs
  const tabs = window.tabs || []

  // get all tabs except current tab
  const otherTabs = tabs.filter(t => t.id !== tab.id)

  // get corresponding group config for current tab
  const currentTabGroupConfig = TAB_GROUP_CONFIG.find(config =>
    matchTab(tab, config),
  )

  if (!currentTabGroupConfig) {
    return
  }

  // create group if not exist
}

export default groupTabs
