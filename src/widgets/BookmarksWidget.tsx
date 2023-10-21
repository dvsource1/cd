import React, { FC } from 'react'
import Widget from '@src/components/Widget'
import {
  addBookmarkToDatabase,
  readBookmarksDatabase,
} from '@src/services/notion/bookmarks'
import { Button } from '@src/components/Button'
import { getAllBookmarks } from '@src/functions/bookmark'
import Json from '@src/components/JSON'

const BookmarksWidget: FC = () => {
  // list all chrome bookmarks
  const [bookmarks, setBookmarks] = React.useState([])
  const [folders, setFolders] = React.useState([])
  const [bookmark, setBookmark] = React.useState({})
  const [structure, setStructure] = React.useState({})

  React.useEffect(() => {
    getAllBookmarks()
      .then(bookmarks => {
        console.log(bookmarks)
        setBookmarks(bookmarks)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  React.useEffect(() => {
    readBookmarksDatabase().then(response => {
      console.log(response)
      setStructure(response.structure)
    })
  }, [])

  const addBookmark = async () => {
    const testBookmark = await chrome.bookmarks.get('6')
    const bookmark = await addBookmarkToDatabase(testBookmark[0], structure)
    setBookmark(bookmark)
  }

  return (
    <Widget>
      <Button variant="outline" onClick={addBookmark}>
        Add Bookmark
      </Button>
      <Json object={bookmark} />
      {/* <ul className="list-disc">
        {folders.map(folder => {
          return (
            <li key={folder.id} className={cn('text-sm text-blue-400')}>
              {folder.title}
            </li>
          )
        })}
      </ul>
      <ul className="list-disc">
        {bookmarks.map(bookmark => {
          return (
            <li key={bookmark.id} className={cn('text-sm')}>
              {bookmark.title}
            </li>
          )
        })}
      </ul> */}
    </Widget>
  )
}

export default BookmarksWidget
