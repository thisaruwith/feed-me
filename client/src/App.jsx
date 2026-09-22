import { Routes, Route, useLocation } from "react-router-dom";
import RestaurantsPage from "./features/customer/pages/RestaurantsPage";
import RestaurantDetailPage from "./features/customer/pages/RestaurantDetailPage";
import CartPage from "./features/customer/pages/CartPage";
import CartBar from "./shared/components/CartBar";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<RestaurantsPage />} />
        <Route
          path="/restaurants/:restaurantId"
          element={<RestaurantDetailPage />}
        />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      {location.pathname !== "/cart" && <CartBar />}
    </>
  );
}

export default App;
