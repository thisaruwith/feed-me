import { mockRestaurants } from "../data/mockRestaurants";
import RestaurantCard from "../components/RestaurantCard";

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Restaurants near you
          </h1>
          <p className="text-gray-500 mt-1">
            {mockRestaurants.length} restaurants available for delivery
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}
