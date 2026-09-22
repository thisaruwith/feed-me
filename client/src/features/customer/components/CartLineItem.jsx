import { useCart } from "../../../shared/context/CartContext";

export default function CartLineItem({ line }) {
  const { menuItemId, name, priceCents, quantity } = line;
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 gap-4">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{name}</h4>
        <span className="text-sm text-gray-500">
          €{(priceCents / 100).toFixed(2)} each
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            type="button"
            onClick={() => updateQuantity(menuItemId, quantity - 1)}
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
            onClick={() => updateQuantity(menuItemId, quantity + 1)}
            aria-label={`Increase quantity of ${name}`}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-lg"
          >
            +
          </button>
        </div>

        <span className="font-semibold text-gray-900 w-16 text-right">
          €{((priceCents * quantity) / 100).toFixed(2)}
        </span>

        <button
          type="button"
          onClick={() => removeFromCart(menuItemId)}
          aria-label={`Remove ${name} from cart`}
          className="text-gray-400 hover:text-red-600 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
