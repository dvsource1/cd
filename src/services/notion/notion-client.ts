import { Client } from '@notionhq/client'

const NOTION_API_KEY = chrome.runtime.getManifest().NOTION_SECRET_KEY

class NotionClient {
  private static instance: Client

  private constructor() {
    // initialize the notion client
  }

  public static getInstance(): Client {
    console.log('NotionClient.getInstance()', NOTION_API_KEY)
    if (!NotionClient.instance) {
      NotionClient.instance = new Client({ auth: NOTION_API_KEY })
    }

    return NotionClient.instance
  }
}

export default NotionClient

// example usage:
// import NotionClient from '../services/notion'
// const notion = NotionClient.getInstance()
// const response = await notion.blocks.children.append({
//   block_id: process.env.NOTION_BLOCK_ID, // the block id of the notion page
//   children: [  // the children to append to the notion page
//     {  // a paragraph block
//       object: 'block', // required
//       type: 'paragraph', // required
//       paragraph: { // required
//         text: [ // required
//           { type: 'text', text: { content: 'Hello world!' } }
//         ]
//       }
//     }
//   ]
// })
// console.log(response)
// {
//   "object": "block",
//   "id": "a6ebd6b6-5d3a-4a7b-9d3c-25e1d9c1b8d9",
//   "created_time": "2021-08-08T21:47:00.000Z",
//   "last_edited_time": "2021-08-08T21:47:00.000Z",
//   "has_children": false,
//   "type": "paragraph",
//   "paragraph": {
//     "text": [
//       {
//         "type": "text",
//         "text": {
//           "content": "Hello world!",
//           "link": null
//         },
//         "annotations": {
//           "bold": false,
//           "italic": false,
//           "strikethrough": false,
//           "underline": false,
//           "code": false,
//           "color": "default"
//         },
//         "plain_text": "Hello world!",
//         "href": null
//       }
//     ]
//   }
