import { useEffect, useState } from "react";
import apiClient from "../../../shared/api/client";
import RestaurantCard from "../components/RestaurantCard";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState[null];

  useEffect(() => {
    let cancelled = false;
    apiClient
      .get("api/restaurants")
      .then((response) => {
        if (!cancelled) setRestaurants(response.data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Restaurants near you
          </h1>
          <p className="text-gray-500 mt-1">
            {isLoading
              ? "Loading restaurants…"
              : `${restaurants.length} restaurants available for delivery`}
          </p>
        </header>

        {error && (
          <p className="text-red-600 text-sm mb-4">
            Couldn't load restaurants. Is the server running?
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}
