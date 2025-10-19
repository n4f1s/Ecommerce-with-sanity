import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { orderType } from './orderTypes'
import { salesType } from './salesType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, blockContentType, orderType, salesType],
}
