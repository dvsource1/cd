import { basicNotify } from '@src/services/base/notifications'

interface HostConfig {
  urlMather: ((url: string) => boolean) | string
  igonreQueryParams?: boolean
}

const HOSTS_CONFIG: HostConfig[] = [
  {
    urlMather: url => new URL(url).host === 'slatescience.atlassian.net',
    igonreQueryParams: true,
  },
]

const matchTab = (tab: chrome.tabs.Tab, config: HostConfig): boolean => {
  if (typeof config.urlMather === 'string') {
    return tab.url === config.urlMather
  }
  return config.urlMather(tab.url)
}

const getURLWithoutQueryParams = (url: string): string => {
  const urlObj = new URL(url)
  return `${urlObj.origin}${urlObj.pathname}`
}

const matchURL = hostConfig => url => tab => {
  if (hostConfig.igonreQueryParams) {
    return getURLWithoutQueryParams(url) === getURLWithoutQueryParams(tab.url)
  }
  return url === tab.url
}

const handleDuplicateTabs = async (tab: chrome.tabs.Tab) => {
  // get host config
  const hostConfig = HOSTS_CONFIG.find(config => matchTab(tab, config))

  // get all tabs
  const tabs = await chrome.tabs.query({})

  // close previous tabs except current tab
  const previousTabs = tabs.filter(t => t.id !== tab.id)
  const matchURLWithHostConfig = matchURL(hostConfig)(tab.url)
  const duplicateTabs = previousTabs.filter(matchURLWithHostConfig)
  duplicateTabs.forEach(t => chrome.tabs.remove(t.id))

  // notify user about removde duplicate tabs
  if (previousTabs.length > 0) {
    await basicNotify(
      'Duplicate tabs removed',
      `Removed ${previousTabs.length} duplicate tabs`,
    )
  }
}

export default handleDuplicateTabs
