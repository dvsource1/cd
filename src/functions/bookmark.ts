import * as _ from 'lodash'

// flatten all the chrome bookmarks
export const flattenBookmarks = (
  items: chrome.bookmarks.BookmarkTreeNode[],
): chrome.bookmarks.BookmarkTreeNode[] => {
  const result: chrome.bookmarks.BookmarkTreeNode[] = []
  items.forEach(item => {
    if (item.children) {
      result.push(...flattenBookmarks(item.children))
    } else {
      result.push(item)
    }
  })
  return result
}

// get all the bookmarks
export const getAllBookmarks = async (): Promise<
  chrome.bookmarks.BookmarkTreeNode[]
> => {
  return new Promise((resolve, _) => {
    chrome.bookmarks.getTree(items => {
      const bookmarks = flattenBookmarks(items)
      resolve(bookmarks)
    })
  })
}

// get all the bookmark folders
export const getAllBookmarkFolders = async (): Promise<
  chrome.bookmarks.BookmarkTreeNode[]
> => {
  const bookmarks = await getAllBookmarks()
  return bookmarks.filter(bookmark => bookmark.url === undefined)
}
