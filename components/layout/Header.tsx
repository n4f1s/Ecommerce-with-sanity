"use client";

import Link from "next/link";
import Form from "next/form";
import {
    Home,
    ListOrdered,
    Search,
    ShoppingCart,
} from "lucide-react";
import useCartStore from "@/store/cart-store";
import useOrderStore from "@/store/order-store";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);



    const itemCount = useCartStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    );
    const orderCount = useOrderStore((state) => state.orders.length);

    if (!isClient) return null;
    return (
        <>
            <header
                className="
          sm:sticky top-0 z-40
          bg-white/60 backdrop-blur-md
          shadow-sm
          border-b border-gray-200
        "
                role="banner"
                aria-label="Site header"
            >
                <div className="flex flex-wrap items-center justify-between sm:px-16 px-4 py-2 max-w-[1500px] w-full mx-auto">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-bold text-theme-primary hover:opacity-70 cursor-pointer mx-auto sm:mx-0"
                        aria-label="ShopHikes home"
                    >
                        ShopHikes
                    </Link>

                    {/* Search Form */}
                    <Form
                        action="/search"
                        role="search"
                        aria-label="Site search"
                        className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
                    >
                        <div className="relative">
                            <label htmlFor="header-search" className="sr-only">
                                Search for products
                            </label>

                            <input
                                id="header-search"
                                type="search"
                                name="query"
                                placeholder="Search for products"
                                className="
                                bg-gray-100 text-gray-800
                                pl-4 pr-12 py-2
                                rounded border w-full max-w-4xl
                                focus:outline-none focus:ring-2 focus:ring-theme-primary"
                            />

                            <button
                                type="submit"
                                aria-label="Search"
                                className="
                                    absolute right-0 top-0 h-full
                                    inline-flex w-10 items-center justify-center
                                    rounded-r bg-theme-primary text-white
                                    hover:bg-theme-secondary
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary"
                            >
                                <Search className="size-5" />
                            </button>
                        </div>
                    </Form>

                    {/* <Form
                        action="/search"
                        role="search"
                        aria-label="Site search"
                        className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
                    >
                        <input
                            type="search"
                            name="query"
                            placeholder="Search for products"
                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-theme-primary border w-full max-w-4xl"
                        />
                    </Form> */}

                    {/* Buttons (desktop/tablet) */}
                    <div className="hidden sm:flex items-center space-x-4">
                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative flex items-center space-x-2 bg-theme-primary hover:bg-theme-secondary text-white font-bold py-2 px-4 rounded transition-all duration-300"
                            aria-label={`My Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                        >
                            <ShoppingCart className="size-6" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center text-xs">
                                {itemCount}
                            </span>
                            <span>My Cart</span>
                        </Link>

                        {/* Orders */}
                        <Link
                            href="/orders"
                            className="relative flex items-center space-x-2 border border-gray-600 hover:bg-theme-secondary text-gray-800 hover:text-white font-bold py-2 px-4 rounded transition-all duration-300"
                            aria-label={`My Orders, ${orderCount} ${orderCount === 1 ? "order" : "orders"}`}
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


            {/* Mobile bottom navigation (always fixed) */}
            <nav
                className="sm:hidden fixed bottom-0 left-0 right-0 z-50
          border-t border-gray-200 bg-white
          pb-[max(env(safe-area-inset-bottom),0px)]
        "
                aria-label="Bottom navigation"
            >
                <ul className="mx-auto flex max-w-[640px] justify-around items-center gap-1 px-2 pb-2 pt-3 text-xs">
                    <li className="flex justify-center">
                        <Link
                            href="/"
                            className={`flex flex-col items-center gap-1 rounded-md px-2 py-1
                                ${pathname == "/" ? "text-theme-secondary" : "text-gray-800"}`}
                            aria-label="Home"
                        >
                            <Home className="size-5" />
                            <span>Home</span>
                        </Link>
                    </li>

                    <li className="flex justify-center">
                        <Link
                            href="/search"
                            className={`flex flex-col items-center gap-1 rounded-md px-2 py-1
                                ${pathname == "/search" ? "text-theme-secondary" : "text-gray-800"}`}
                            aria-label="Search"
                        >
                            <Search className="size-5" />
                            <span>Search</span>
                        </Link>
                    </li>

                    {/* <li className="flex justify-center">
            <Link
              href="/collection"
              className="flex flex-col items-center gap-1 rounded-md px-2 py-1 text-gray-800"
              aria-label="Collection"
            >
              <Grid3X3 className="size-5" />
              <span>Collection</span>
            </Link>
          </li> */}


                    <li className="flex justify-center">
                        <Link
                            href="/cart"
                            className={`relative flex flex-col items-center gap-1 rounded-md px-2 py-1
                                ${pathname == "/cart" ? "text-theme-secondary" : "text-gray-800"}`}
                            aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                        >
                            <ShoppingCart className="size-5" />
                            <span>Cart</span>
                            {itemCount > 0 && (
                                <span className="absolute -top-1.5 -right-[1px] flex h-4 min-w-4 items-center justify-center rounded-full bg-theme-primary px-1 text-[10px] font-bold text-white">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </li>

                    {/* Orders (active on orders pages) */}
                    <li className="flex justify-center">
                        <Link
                            href="/orders"
                            className={`relative flex flex-col items-center gap-1 rounded-md px-2 py-1
                                ${pathname == "/orders" ? "text-theme-secondary" : "text-gray-800"}`}
                            aria-current={typeof window !== "undefined" && window.location?.pathname.startsWith("/orders") ? "page" : undefined}
                            aria-label="Orders"
                        >
                            <ListOrdered className="size-5" />
                            <span>Orders</span>
                            {orderCount > 0 && (
                                <span className="absolute -top-1.5 right-[2px] flex h-4 min-w-4 items-center justify-center rounded-full bg-theme-primary px-1 text-[10px] font-bold text-white">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
