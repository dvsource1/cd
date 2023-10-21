import NotionClient from './notion-client'
import {
  GetDatabaseResponse,
  CreatePageResponse,
  QueryDatabaseResponse,
  PartialDatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { isNil, reduce, set, keys, isEmpty } from 'lodash'

type GetDatabaseResponseProperties = GetDatabaseResponse['properties']
export type StringOrNull = string | null

// types
export interface IDatabase {
  structure: Record<string, string>
  records: Record<string, string>[]
}

export type IStructure = Record<string, [string, StringOrNull]>
export type IRecord = Record<string, StringOrNull>

// read notion database
export const readDatabase = (id: string): Promise<GetDatabaseResponse> => {
  const notion = NotionClient.getInstance()
  return notion.databases.retrieve({
    database_id: id,
  })
}

export const readDatabaseData = async (
  id: string,
): Promise<QueryDatabaseResponse> => {
  const notion = NotionClient.getInstance()
  const response = await notion.databases.query({
    database_id: id,
  })
  return response
}

export const restructureDatabaseRecords = async (
  id: string,
): Promise<IDatabase> => {
  // get database structure
  const database: GetDatabaseResponse = await readDatabase(id)

  // get all data
  const data: QueryDatabaseResponse = await readDatabaseData(id)

  console.log(database, data)

  const { properties } = database
  const propertiesKeys: string[] = keys(properties)

  if (isNil(properties)) {
    return { structure: {}, records: [] }
  }

  const structure = getDatabaseStructure(properties)

  const { results } = data
  if (isNil(results)) {
    return { structure, records: [] }
  }

  const records = reduce(
    results as PartialDatabaseObjectResponse[],
    (acc1: IRecord[], result: PartialDatabaseObjectResponse) => {
      const record: Record<string, string> = getDatabaseRecord(
        propertiesKeys,
        result,
      )
      acc1.push(record)
      return acc1
    },
    [],
  )
  return { structure, records }
}

export const createDatabaseRecord = async (
  id: string,
  data: Record<string, string>,
  structure: Record<string, string>,
): Promise<CreatePageResponse> => {
  const notion = NotionClient.getInstance()
  const properties = getCreatePageProperties(data, structure)
  const response = await notion.pages.create({
    parent: {
      type: 'database_id',
      database_id: id,
    },
    properties,
  })
  return
  return response
}

const getDatabaseStructure = (properties: GetDatabaseResponseProperties) => {
  return reduce(
    properties,
    (acc, property, key) => {
      set(acc, key, getPropertyFormat(property))
      return acc
    },
    {},
  )
}

const getPropertyFormat = (property): [string, StringOrNull] => {
  switch (property.type) {
    case 'title':
      return [property.type, 'text']
    case 'number':
      return [property.type, property.number.format]
    case 'select':
      return [property.type, property.select.options.join(',')]
    case 'multi_select':
      return [property.type, property.multi_select.options.join(',')]
    case 'url':
      return [property.type, null]
    case 'relation':
      return [property.type, property.database_id]
    default:
      return [property.type, null]
  }
}

const getDatabaseRecord = (
  propertiesKeys: string[],
  result: PartialDatabaseObjectResponse,
): IRecord => {
  return reduce(
    propertiesKeys,
    (acc2, propertKey: string) => {
      const property = result.properties[propertKey]
      const value = getValue(property)
      set(acc2, propertKey, value)
      return acc2
    },
    {},
  )
}

const getValue = (property): StringOrNull => {
  switch (property.type) {
    case 'title':
      return !isEmpty(property.title) ? property.title[0].text.content : null
    case 'number':
      return !isNil(property.number) ? property.number.toString() : null
    case 'select':
      return !isNil(property.select) ? property.select.name : null
    case 'multi_select':
      return !isEmpty(property.multi_select)
        ? property.multi_select.map(option => option.name).join(',')
        : null
    case 'url':
      return property.url
    case 'relation':
      return !isEmpty(property.relation) ? property.relation[0].id : null
    default:
      return ''
  }
}

const getCreatePageProperties = (
  data: Record<string, string>,
  structure: Record<string, string>,
) => {
  return reduce(
    data,
    (acc, value, key) => {
      const [type] = structure[key]
      const property = getProperty(value, type)
      set(acc, key, property)
      return acc
    },
    {},
  )
}

const getProperty = (value: string, type: string) => {
  switch (type) {
    case 'title':
      return {
        title: [
          {
            type: 'text',
            text: {
              content: value,
            },
          },
        ],
      }
    case 'number':
      return !isNil(value)
        ? {
            number: parseInt(value),
          }
        : undefined
    case 'select':
      return !isNil(value)
        ? {
            select: {
              name: value,
            },
          }
        : undefined
    case 'multi_select':
      return !isNil(value)
        ? {
            multi_select: value.split(',').map(option => ({
              name: option,
            })),
          }
        : undefined
    case 'url':
      return !isNil(value)
        ? {
            url: value,
          }
        : undefined
    case 'relation':
      return undefined
    // return !isNil(value)
    //   ? {
    //       relation: [
    //         {
    //           id: value,
    //         },
    //       ],
    //     }
    //   : undefined
    default:
      return {}
  }
}
