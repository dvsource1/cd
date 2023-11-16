import { handleTabEffect } from '@src/services/base/tabs'

const tabListener = () => {
  const handleTabActivate = async (activeInfo: chrome.tabs.TabActiveInfo) => {
    const { tabId } = activeInfo
    handleTabEffect('ACTIVATED', tabId, activeInfo)
  }

  const handleTabAttach = async (
    tabId: number,
    attachInfo: chrome.tabs.TabAttachInfo,
  ) => {
    handleTabEffect('ATTACHED', tabId, attachInfo)
  }

  const handleTabCreate = (tab: chrome.tabs.Tab) => {
    handleTabEffect('CREATED', tab.id)
  }

  const handleTabDetach = async (
    tabId: number,
    detachInfo: chrome.tabs.TabDetachInfo,
  ) => {
    handleTabEffect('DETACHED', tabId, detachInfo)
  }

  const handleTabMove = async (
    tabId: number,
    moveInfo: chrome.tabs.TabMoveInfo,
  ) => {
    handleTabEffect('MOVED', tabId, moveInfo)
  }

  const handleTabRemove = async (
    tabId: number,
    removeInfo: chrome.tabs.TabRemoveInfo,
  ) => {
    handleTabEffect('REMOVED', tabId, removeInfo)
  }

  const handleTabUpdate = async (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab,
  ) => {
    const { status } = changeInfo
    if (status === 'loading') {
      handleTabEffect('UPDATED:LOADING', tabId, changeInfo, tab)
    }
    if (status === 'complete') {
      handleTabEffect('UPDATED:COMPLETE', tabId, changeInfo, tab)
    }
  }

  chrome.tabs.onActivated.addListener(handleTabActivate)
  chrome.tabs.onAttached.addListener(handleTabAttach)
  chrome.tabs.onCreated.addListener(handleTabCreate)
  chrome.tabs.onDetached.addListener(handleTabDetach)
  chrome.tabs.onMoved.addListener(handleTabMove)
  chrome.tabs.onRemoved.addListener(handleTabRemove)
  chrome.tabs.onUpdated.addListener(handleTabUpdate)
}

export default tabListener
