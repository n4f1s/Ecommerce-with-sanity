import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $slug][0]{
      ...,
      // Flattened video URL for simple consumption in React/TS
      "videoUrl": file.asset->url,
    }
  `);

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });

    // Returns the single product document or null
    return product.data || null;
  } catch (error) {
    console.log("Error fetching product by slug:", error);
    return null;
  }
};
