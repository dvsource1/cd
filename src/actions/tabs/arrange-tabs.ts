const TABS_STATIC_ORDER: {
  urlMather: string | ((url: string) => boolean)
  order: number
}[] = [
  {
    urlMather: url => new URL(url).host === 'mail.google.com',
    order: 0,
  },
  {
    urlMather: url => new URL(url).host === 'calendar.google.com',
    order: 1,
  },
  {
    urlMather: 'chrome://newtab/',
    order: -1,
  },
]

const matchTab = (
  tab: chrome.tabs.Tab,
  urlMather: string | ((url: string) => boolean),
): boolean => {
  if (typeof urlMather === 'string') {
    return tab.url === urlMather
  }
  return urlMather(tab.url)
}

const arrangeTabs = async (tab: chrome.tabs.Tab): Promise<void> => {
  console.log('arrangeTabs', tab)
  // get current window
  const window = await chrome.windows.get(tab.windowId, { populate: true })

  // get all tabs
  const tabs = window.tabs || []

  // get all tabs except current tab
  const otherTabs = tabs.filter(t => t.id !== tab.id)

  // get current tab static order
  const currentTabStaticOrder = TABS_STATIC_ORDER.find(({ urlMather }) =>
    matchTab(tab, urlMather),
  )

  if (!currentTabStaticOrder) {
    return
  }

  // get target index for current tab
  let targetIndex = 0
  for (const t of otherTabs) {
    const staticOrder = TABS_STATIC_ORDER.find(({ urlMather }) =>
      matchTab(t, urlMather),
    )
    if (!staticOrder) {
      targetIndex += 1
      continue
    }
    if (staticOrder.order > currentTabStaticOrder.order) {
      break
    }
    targetIndex += 1
  }

  // move current tab to target index
  await chrome.tabs.move(tab.id, {
    windowId: tab.windowId,
    index: targetIndex,
  })
}

export default arrangeTabs
