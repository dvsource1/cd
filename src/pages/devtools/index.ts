try {
  chrome.devtools.panels.create(
    'DV/CD Panel',
    'icon-34.png',
    'src/pages/panel/index.html',
  )
} catch (e) {
  console.error(e)
}
