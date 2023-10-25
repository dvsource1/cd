import * as _ from 'lodash'
import {
  createDatabaseRecord,
  readDatabaseStructure,
  restructureDatabaseRecords,
} from './notion-database'
import { convertObjectToStringRecord } from '@src/lib/converter'

const NOTION_BOOKMARKS_DATABASE_ID = 'c8d3211136ce494589f9363842185850'
const NOTION_BOOKMARK_FOLDERS_DATABASE_ID = '72c4b4fdd140454d8a9a0dbec2d3677e'

export interface IBookmark {
  ID: number
  Index: number
  URL: string
  Title: string
  ParentID: number
  Group: string
}

export interface IBookmarkFolder {
  ID: number
  Index: number
  Title: string
  ParentID: number
}

export const readBookmarksDatabaseStructure = async () => {
  return await readDatabaseStructure(NOTION_BOOKMARKS_DATABASE_ID)
}

export const readBookmarkFoldersDatabaseStructure = async () => {
  return await readDatabaseStructure(NOTION_BOOKMARKS_DATABASE_ID)
}

// read notion bookmarks database
export const readBookmarksDatabase = async structure => {
  return await restructureDatabaseRecords(
    NOTION_BOOKMARKS_DATABASE_ID,
    structure,
  )
}

export const readBookmarkFoldersDatabase = async structure => {
  return await restructureDatabaseRecords(
    NOTION_BOOKMARK_FOLDERS_DATABASE_ID,
    structure,
  )
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

export const addBookmarkFolderToDatabase = async (
  chromeBookmark: chrome.bookmarks.BookmarkTreeNode,
  structure: Record<string, string>,
) => {
  const bookmarkFolder: IBookmarkFolder =
    getDatabaseBookmarkFolder(chromeBookmark)
  const record = convertObjectToStringRecord<IBookmarkFolder>(bookmarkFolder)
  console.log(record)
  return createDatabaseRecord(
    NOTION_BOOKMARK_FOLDERS_DATABASE_ID,
    structure,
    record,
  )
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

// get database bookmark folder object
const getDatabaseBookmarkFolder = (
  chromeBookmark: chrome.bookmarks.BookmarkTreeNode,
): IBookmarkFolder => {
  const { id, index, title, parentId } = chromeBookmark
  return {
    ID: +id,
    Index: index,
    Title: title,
    ParentID: +parentId,
  }
}
