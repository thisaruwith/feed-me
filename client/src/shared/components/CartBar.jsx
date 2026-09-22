import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartBar() {
  const { totalItems, totalPriceCents } = useCart();

  if (totalItems === 0) return null;

  return (
    <Link
      to="/cart"
      className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-lg hover:bg-gray-800 transition-colors"
    >
      <span className="text-sm font-medium">
        {totalItems} item{totalItems > 1 ? "s" : ""} in cart
      </span>
      <span className="font-semibold">
        View cart · €{(totalPriceCents / 100).toFixed(2)}
      </span>
    </Link>
  );
}
