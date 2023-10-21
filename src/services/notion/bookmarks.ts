import * as _ from 'lodash'
import {
  createDatabaseRecord,
  restructureDatabaseRecords,
} from './notion-database'
import { convertObjectToStringRecord } from '@src/lib/converter'

const NOTION_BOOKMARKS_DATABASE_ID = 'c8d3211136ce494589f9363842185850'

export interface IBookmark {
  ID: number
  Index: number
  URL: string
  Title: string
  ParentID: number
  Group: string
}

// read notion bookmarks database
export const readBookmarksDatabase = async () => {
  return await restructureDatabaseRecords(NOTION_BOOKMARKS_DATABASE_ID)
}

// add bookmark to notion database
export const addBookmarkToDatabase = async (
  chromeBookmark: chrome.bookmarks.BookmarkTreeNode,
  structure: Record<string, string>,
) => {
  const bookmark: IBookmark = getDatabaseBookmark(chromeBookmark)
  const record = convertObjectToStringRecord<IBookmark>(bookmark)
  return createDatabaseRecord(NOTION_BOOKMARKS_DATABASE_ID, structure, record)
}

// get database bookmark object
const getDatabaseBookmark = (
  chromeBookmark: chrome.bookmarks.BookmarkTreeNode,
): IBookmark => {
  const { id, index, url, title, parentId } = chromeBookmark
  return {
    ID: +id,
    Index: index,
    URL: url,
    Title: title,
    ParentID: +parentId,
    Group: '',
  }
}
