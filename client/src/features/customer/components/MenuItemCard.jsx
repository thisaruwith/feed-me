import { useState } from "react";
import { useCart } from "../../../shared/context/CartContext";

export default function MenuItemCard({ item, restaurantId, restaurantName }) {
  const { name, description, priceCents } = item;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    addToCart(item, quantity, restaurantId, restaurantName);
    setQuantity(1);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="pr-4">
        <h4 className="font-medium text-gray-900">{name}</h4>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        <span className="font-semibold text-gray-900 whitespace-nowrap">
          €{(priceCents / 100).toFixed(2)}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            type="button"
            onClick={decrease}
            aria-label={`Decrease quantity of ${name}`}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            type="button"
            onClick={increase}
            aria-label={`Increase quantity of ${name}`}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-lg"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}
