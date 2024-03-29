import tabListener from '@src/listeners/tab-listener'
import initStores from '@src/store/init-store'
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script'

reloadOnUpdate('pages/background')

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss')

console.log('dv/cd is running')

initStores()

tabListener()
