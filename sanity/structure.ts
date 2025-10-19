import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Shopper ecommerce website')
    .items([
      S.listItem()
        .title('Categories')
        .child(S.documentTypeList('category').title('Categories')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category'].includes(item.getId()!)
      ),
    ])
