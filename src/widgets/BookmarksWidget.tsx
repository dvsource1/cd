import React, { FC } from 'react'
import Widget from '@src/components/Widget'
import {
  addBookmarkFolderToDatabase,
  addBookmarkToDatabase,
  readBookmarkFoldersDatabase,
  readBookmarkFoldersDatabaseStructure,
  readBookmarksDatabase,
  readBookmarksDatabaseStructure,
} from '@src/services/notion/bookmarks'
import { Button } from '@src/components/Button'
import Json from '@src/components/Json'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@src/components/Dialog'
import { isNil } from 'lodash'

const BookmarksWidget: FC = () => {
  const [bookmarkStruture, setBookmarkStructure] = React.useState({})
  const [bookmarkFolderStructure, setBookmarkFolderStructure] = React.useState(
    {},
  )

  const [newBookmarkFolder, setNewBookmarkFolder] = React.useState<
    Partial<chrome.bookmarks.BookmarkTreeNode>
  >({})

  React.useEffect(() => {
    readBookmarksDatabaseStructure().then(structure => {
      setBookmarkStructure(structure)
    })
    readBookmarkFoldersDatabaseStructure().then(structure => {
      setBookmarkFolderStructure(structure)
    })
  }, [])

  const readBookmarks = async () => {
    const bookmarksFromDatabase = await readBookmarksDatabase(bookmarkStruture)
    console.log(bookmarksFromDatabase)
  }

  const readBookmarkFolders = async () => {
    const foldersFromDatabase = await readBookmarkFoldersDatabase(
      bookmarkFolderStructure,
    )
    console.log(foldersFromDatabase)
  }

  const addBookmark = async () => {
    const testBookmark = await chrome.bookmarks.get('6')
    const bookmark = await addBookmarkToDatabase(
      testBookmark[0],
      bookmarkStruture,
    )
    console.log(bookmark)
  }

  const addBookmarkFolder = async () => {
    if (isNil(newBookmarkFolder.title)) {
      return
    }
    newBookmarkFolder.parentId = '-1'
    newBookmarkFolder.index = 0
    const bookmarkFolder = await addBookmarkFolderToDatabase(
      newBookmarkFolder as chrome.bookmarks.BookmarkTreeNode,
      bookmarkFolderStructure,
    )
    console.log(bookmarkFolder)
  }

  return (
    <Widget className="flex flex-col">
      {/* <Json className="text-xs" object={bookmarkStruture} /> */}
      {/* <Json className="text-xs" object={bookmarkFolderStructure} /> */}
      <Button variant="outline" onClick={readBookmarkFolders}>
        Read Bookmark Folders
      </Button>
      <Button variant="outline" onClick={readBookmarks}>
        Read Bookmarks
      </Button>
      <Button variant="outline" onClick={addBookmark}>
        Add Bookmark
      </Button>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Add Folder</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Bookmark Folder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="col-span-1">Name</label>
              <input
                value={newBookmarkFolder.title}
                onChange={e =>
                  setNewBookmarkFolder({
                    ...newBookmarkFolder,
                    title: e.target.value,
                  })
                }
                type="text"
                className="col-span-3 rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addBookmarkFolder}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Json object={newBookmarkFolder} />
    </Widget>
  )
}

export default BookmarksWidget
