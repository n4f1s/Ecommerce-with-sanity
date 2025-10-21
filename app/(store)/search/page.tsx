import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const SearchPage = async ({ searchParams }: PageProps) => {
    const { query } = await searchParams;
    const queryString = typeof query === "string" ? query : "";
    const products = await searchProductsByName(queryString);

    if (!products.length) {
        return (
            <div className="flex flex-col items-center justify-top min-h-screen bg-gray-200 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                    <h1 className="text-3xl font-fold pb-6 text-center">
                        No products found for: {query}
                    </h1>
                    <p className="text-gray-600 text-center">
                        Try search with different keywords
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-200">
            <div className="wrapper">
                <div className="bg-white rounded shadow-md w-full min-h-[50vh] py-8 px-4">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
                        Search results for &quot;{query}&quot;
                    </h1>
                    <ProductGrid products={products} />
                </div>
            </div>
        </div>
    )
}

export default SearchPage