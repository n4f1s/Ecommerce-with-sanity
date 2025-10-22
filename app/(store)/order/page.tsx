import Orders from "@/components/Orders"


function OrderPage() {
    return (
        <div className="bg-gray-100 w-full h-full">
            <div className="wrapper">
                <div className="bg-white w-full h-full flex flex-col gap-y-8 py-8 sm:py-14 px-4 sm:px-8 rounded">
                    <h2 className="text-xl sm:text-3xl font-bold">
                        My Orders
                    </h2>
                    <Orders />
                </div>
            </div>
        </div>
    )
}

export default OrderPage