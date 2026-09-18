import { useCart } from "../context/CartContext";

export default function CartBar() {
  const { totalItems, totalPriceCents } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-lg">
      <span className="text-sm font-medium">
        {totalItems} item{totalItems > 1 ? "s" : ""} in cart
      </span>
      <span className="font-semibold">
        €{(totalPriceCents / 100).toFixed(2)}
      </span>
    </div>
  );
}
