// import { createRoot } from 'react-dom/client'
// import App from '@src/pages/content/components/Demo/app'
import refreshOnUpdate from 'virtual:reload-on-update-in-view'

refreshOnUpdate('pages/content')

const root = document.createElement('div')
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root'

// TODO: enable theses when we have a better solution for the content scripts
// document.body.append(root)
// createRoot(root).render(<App />)
