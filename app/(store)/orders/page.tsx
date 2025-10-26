import Orders from "@/components/order/Orders";

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="wrapper">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 sm:px-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">📦</span>
              My Orders
            </h1>
            <p className="text-blue-100 mt-2">Track and manage your orders</p>
          </div>

          {/* Orders List */}
          <div className="p-6 sm:p-8">
            <Orders />
          </div>
        </div>
      </div>
    </div>
  );
}
