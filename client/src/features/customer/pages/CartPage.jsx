import { Link } from "react-router-dom";
import { useCart } from "../../../shared/context/CartContext";
import CartLineItem from "../components/CartLineItem";

export default function CartPage() {
  const { items, totalItems, totalPriceCents, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
          <Link
            to="/"
            className="inline-block mt-3 text-blue-600 hover:underline"
          >
            Browse restaurants
          </Link>
        </div>
      </div>
    );
  }

  const groups = items.reduce((acc, line) => {
    if (!acc[line.restaurantId]) {
      acc[line.restaurantId] = {
        restaurantName: line.restaurantName,
        lines: [],
      };
    }
    acc[line.restaurantId].lines.push(line);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 pb-32">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your cart</h1>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            ← Add more items
          </Link>
        </div>

        {Object.values(groups).map((group) => (
          <div
            key={group.restaurantName}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4"
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {group.restaurantName}
            </h2>
            {group.lines.map((line) => (
              <CartLineItem key={line.menuItemId} line={line} />
            ))}
          </div>
        ))}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center justify-between">
          <span className="text-gray-600">
            Total ({totalItems} item{totalItems > 1 ? "s" : ""})
          </span>
          <span className="text-xl font-bold text-gray-900">
            €{(totalPriceCents / 100).toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          disabled
          className="w-full mt-4 py-3 bg-green-600 text-white font-semibold rounded-lg opacity-60 cursor-not-allowed"
        >
          Checkout (coming soon)
        </button>

        <button
          type="button"
          onClick={clearCart}
          className="w-full mt-2 py-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}
