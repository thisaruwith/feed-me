import { createContext, useContext, useState } from "react";

const cartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (menuItem, quantity, restaurantId, restaurantName) => {
    setItems((prev) => {
      const existing = prev.find((line) => line.menuItemId === menuItem.id);
      if (existing) {
        return prev.map((line) =>
          line.menuItemId === menuItem.id
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }
      return [
        ...prev,
        {
          menuItemId: menuItem.id,
          name: menuItem.name,
          priceCents: menuItem.priceCents,
          quantity,
          restaurantId,
          restaurantName,
        },
      ];
    });
  };

  const removeFromCart = (menuItemId) => {
    setItems((prev) => prev.filter((line) => line.menuItemId !== menuItemId));
  };

  const updateQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }
    setItems((prev) =>
      prev.map(
        (line) => (
          line,
          menuItemId === menuItemId ? { ...line, quantity } : line
        ),
      ),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, line) => sum + line.quantity, 0);
  const totalPriceCents = items.reduce(
    (sum, line) => sum + line.priceCents * line.quantity,
    0,
  );

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPriceCents,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a cartProvider");
  }
  return context;
}
