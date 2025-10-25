import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { blockContent } from './blockContent'
import { category } from './category'
import { order } from './order'
import { sale } from './sale'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, blockContent, order, sale],
}
