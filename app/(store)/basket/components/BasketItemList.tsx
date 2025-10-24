"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import AddToBasketButton from "@/components/AddToBasketQuantity";
import { useRouter } from "next/navigation";
import { Product } from "@/sanity.types";

type BasketItem = {
    product: Product;
    quantity: number;
};

export default function BasketItemList({ items }: { items: BasketItem[] }) {
    const router = useRouter();

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div
                    key={item.product._id}
                    className="p-4 border rounded-2xl flex items-center justify-between lg:max-w-[800px] gap-4"
                >
                    <div
                        className="flex items-center cursor-pointer flex-1 min-w-0"
                        onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                    >
                        {item.product.image && (
                            <Image
                                src={urlFor(item.product.image).url()}
                                alt={item.product.name ?? "Product image"}
                                width={96}
                                height={96}
                                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded mr-4"
                            />
                        )}
                        <div className="min-w-0">
                            <h2 className="text-lg sm:text-xl font-semibold truncate">
                                {item.product.name}
                            </h2>
                            <p className="text-sm sm:text-base">
                                Price: Tk {(item.product.price ?? 0)}
                            </p>
                        </div>
                    </div>

                    <AddToBasketButton product={item.product} />
                </div>
            ))}
        </div>
    );
}
