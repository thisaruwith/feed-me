import { useParams, Link } from "react-router-dom";
import { mockRestaurants } from "../data/mockRestaurants";
import { mockMenus } from "../data/mockMenus";
import MenuItemCard from "../components/MenuItemCard";
import CartBar from "../../../shared/components/CartBar";

export default function ResturantDetailPage() {
  const { restaurantId } = useParams();
  const restaurant = mockRestaurants.find((r) => r.id === Number(restaurantId));
  const menuItems = mockMenus[restaurantId] || [];

  if (!restaurant) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-gray-600">Restaurant not found.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ← Back to restaurants
        </Link>

        <div className="mt-4 flex items-center gap-4">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {restaurant.name}
            </h1>
            <p className="text-gray-500">
              {restaurant.cuisine} · {restaurant.address}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="text-amber-500">★</span>{" "}
              {restaurant.rating.toFixed(1)} · {restaurant.deliveryTimeMinutes}{" "}
              min
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Menu</h2>
          {menuItems.length === 0 ? (
            <p className="text-gray-500 text-sm">No menu items yet.</p>
          ) : (
            menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                restaurantId={restaurant.id}
                restaurantName={restaurant.name}
              />
            ))
          )}
        </div>
      </div>
      <CartBar />
    </div>
  );
}
