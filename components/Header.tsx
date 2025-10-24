"use client";

import Link from "next/link";
import Form from "next/form";
import { ListOrdered, ShoppingCart } from "lucide-react";
import useBasketStore from "@/store/store";
import useOrderStore from "@/store/orderStore";

const Header = () => {
    const itemCount = useBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    );
    const orderCount = useOrderStore((state) => state.orders.length);

    return (
        <header
            className="
        sticky top-0 z-50
        bg-white/60 backdrop-blur-md
        shadow-sm
        border-b border-gray-200
      "
        >
            <div className="flex flex-wrap justify-between items-center sm:px-16 px-4 py-2 max-w-[1500px] w-full mx-auto">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-theme-primary hover:opacity-70 cursor-pointer mx-auto sm:mx-0"
                >
                    Shoper
                </Link>

                {/* Search Form */}
                <Form
                    action="/search"
                    className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
                >
                    <input
                        type="text"
                        name="query"
                        placeholder="Search for products"
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-theme-primary border w-full max-w-4xl"
                    />
                </Form>

                {/* Buttons */}
                <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none justify-center sm:justify-end">
                    {/* Basket */}
                    <Link
                        href="/basket"
                        className="relative flex items-center space-x-2 bg-theme-primary hover:bg-theme-secondary text-white font-bold py-2 px-4 rounded transition-all duration-300"
                    >
                        <ShoppingCart className="size-6" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center text-xs">
                            {itemCount}
                        </span>
                        <span>My Basket</span>
                    </Link>

                    {/* Orders */}
                    <Link
                        href="/order"
                        className="relative flex items-center space-x-2 border border-gray-600 hover:bg-theme-secondary text-gray-800 hover:text-white font-bold py-2 px-4 rounded transition-all duration-300"
                    >
                        <ListOrdered className="size-6" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center text-xs">
                            {orderCount}
                        </span>
                        <span>My Orders</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
