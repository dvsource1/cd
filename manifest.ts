import packageJson from './package.json'
import dotenv from 'dotenv'

dotenv.config()

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  permissions: [
    'bookmarks',
    'tabs',
    'tabGroups',
    'activeTab',
    'history',
    'notifications',
    'storage',
  ],
  host_permissions: ['http://*/*', 'https://*/*'],
  options_page: 'src/pages/options/index.html',
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon-34.png',
  },
  chrome_url_overrides: {
    newtab: 'src/pages/newtab/index.html',
  },
  icons: {
    '128': 'icon-128.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/content/index.js'],
      // KEY for cache invalidation
      css: ['assets/css/contentStyle<KEY>.chunk.css'],
    },
  ],
  devtools_page: 'src/pages/devtools/index.html',
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        'icon-128.png',
        'icon-34.png',
      ],
      matches: ['*://*/*'],
    },
  ],
  UNSPLASH_API_KEY: process.env.UNSPLASH_API_KEY,
  NOTION_SECRET_KEY: process.env.NOTION_SECRET_KEY,
}

export default manifest
