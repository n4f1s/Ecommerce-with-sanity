import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
        *[
            _type == "product"
        ] | order(name asc)
    `)
    try {
        // Use sanityFetch to send the query
        const products = await sanityFetch({
            query: ALL_PRODUCTS_QUERY,
        });

        // return the list of produtcs or empty array if none are found
        return products.data || [];
    } catch (error) {
        console.log("Error fetching all products:", error);
        return [];
    }
}
