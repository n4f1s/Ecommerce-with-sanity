import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export const getProductsByCategory = async (categorySlug: string) => {
  const PRODUCT_BY_CATEGORY_QUERY = defineQuery(`
        *[
            _type == "product" 
            && references(*[_type == "category" && slug.current == $categorySlug]._id)
        ] | order(name asc)
    `);
  try {
    // Use sanityFetch to send the query with the slug as a parameter
    const product = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: {
        categorySlug, // ✅ matches the variable used in the query
      },
    });

    // Return the list of products or an empty array if none are found
    return product.data || [];
  } catch (error) {
    console.error("Error fetching product by category:", error);
    return [];
  }
};
