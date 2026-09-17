import { Routes, Route } from "react-router-dom";
import RestaurantsPage from "./features/customer/pages/RestaurantsPage";
import RestaurantDetailPage from "./features/customer/pages/RestaurantDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RestaurantsPage />} />
      <Route
        path="/restaurants/:restaurantId"
        element={<RestaurantDetailPage />}
      />
    </Routes>
  );
}

export default App;
