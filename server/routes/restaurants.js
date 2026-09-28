const express = require("express");
const pool = require("../lib/db");

const router = express.Router();

function mapRestaurant(row) {
  return {
    id: row.id,
    name: row.name,
    cuisine: row.cuisine,
    address: row.address,
    rating: row.rating !== null ? Number(row.rating) : null,
    deliveryTimeMinutes: row.delivery_time_minutes,
    isOpen: row.is_open,
    image: row.image_url,
  };
}

function mapMenuItem(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    priceCents: row.price_cents,
  };
}

router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM restaurants ORDER BY id ASC",
  );
  res.json(rows);
});

router.get("/:id/menu", async (req, res) => {
  const restaurantId = Number(req.params.id);
  const { rows: resturantRows } = await pool.query(
    "SELECT * FROM restaurants WHERE id = $1",
    [restaurantId],
  );
  const restaurant = resturantRows[0];
  if (!restaurant)
    return res.status(404).json({ error: "Restaurant not found" });

  const { rows: menuItems } = await pool.query(
    "SELECT * FROM menu_items WHERE restaurant_id = $1 ORDER BY id ASC",
    [restaurantId],
  );
  res.json({ ...restaurant, menuItems });
});

module.exports = router;
