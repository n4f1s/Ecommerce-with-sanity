import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export const getAllCategories = async () => {
  const ALL_CATEGORIES_QUERY = defineQuery(`
        *[
            _type == "category"
        ] | order(name asc)
    `)
    try {
        // Use sanityFetch to send the query
        const products = await sanityFetch({
            query: ALL_CATEGORIES_QUERY,
        });

        // return the list of categories or empty array if none are found
        return products.data || [];
    } catch (error) {
        console.log("Error fetching all categories:", error);
        return [];
    }
}
