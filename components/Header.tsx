"use client"

import Link from "next/link"
import Form from "next/form"
import { ShoppingCart, User } from "lucide-react"


const Header = () => {

    return (
        <header className="flex flex-wrap justify-between items-center px-4 py-2">
            <div className="flex w-full flex-wrap justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0">
                    Shoper
                </Link>

                <Form action='/search' className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search for products"
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border w-full max-w-4xl"
                    />
                </Form>

                <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
                    <Link 
                    href='/basket'
                    className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        <ShoppingCart className="size-6" />
                        {/* Item Count */}
                        <span>
                            My Basket
                        </span>
                    </Link>

                    <User className="size-6" />
                    <p className="text-gray-400">
                        Welcome
                    </p>
                </div>
            </div>
        </header>
    )
}

export default Header