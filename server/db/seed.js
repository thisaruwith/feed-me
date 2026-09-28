const pool = require("../lib/db");

const RESTAURANTS = [
  {
    name: "Golden Dragon",
    cuisine: "Chinese",
    address: "12 Market St",
    lat: 51.5074,
    lng: -0.1278,
    rating: 4.6,
    delivery_time_minutes: 25,
    image_url: "https://picsum.photos/seed/golden-dragon/400/240",
    menu: [
      {
        name: "Kung Pao Chicken",
        description: "Diced chicken, peanuts, chili peppers, Sichuan pepper",
        price_cents: 1150,
      },
      {
        name: "Vegetable Spring Rolls",
        description: "Crispy rolls with cabbage, carrot, glass noodles",
        price_cents: 550,
      },
      {
        name: "Beef Chow Mein",
        description: "Stir-fried noodles, beef, bean sprouts, scallion",
        price_cents: 1250,
      },
    ],
  },
  {
    name: "Pasta Bella",
    cuisine: "Italian",
    address: "48 Old Town Rd",
    lat: 51.5099,
    lng: -0.1337,
    rating: 4.5,
    delivery_time_minutes: 35,
    image_url: "https://picsum.photos/seed/pasta-bella/400/240",
    menu: [
      {
        name: "Spaghetti Carbonara",
        description: "Egg, pecorino, guanciale, black pepper",
        price_cents: 1350,
      },
      {
        name: "Margherita Pizza",
        description: "San Marzano tomato, fior di latte, basil",
        price_cents: 1100,
      },
      {
        name: "Tiramisu",
        description: "Espresso-soaked ladyfingers, mascarpone",
        price_cents: 650,
      },
    ],
  },
  {
    name: "Taco Loco",
    cuisine: "Mexican",
    address: "7 River Walk",
    lat: 51.5122,
    lng: -0.1201,
    rating: 4.7,
    delivery_time_minutes: 20,
    image_url: "https://picsum.photos/seed/taco-loco/400/240",
    menu: [
      {
        name: "Carne Asada Tacos (3)",
        description: "Grilled steak, onion, cilantro, lime",
        price_cents: 950,
      },
      {
        name: "Chicken Burrito",
        description: "Grilled chicken, rice, beans, salsa, sour cream",
        price_cents: 1050,
      },
      {
        name: "Guacamole & Chips",
        description: "Fresh avocado dip with tortilla chips",
        price_cents: 500,
      },
    ],
  },
  {
    name: "Curry House",
    cuisine: "Indian",
    address: "101 High St",
    lat: 51.5155,
    lng: -0.141,
    rating: 4.4,
    delivery_time_minutes: 30,
    image_url: "https://picsum.photos/seed/curry-house/400/240",
    menu: [
      {
        name: "Chicken Tikka Masala",
        description: "Chicken in creamy spiced tomato sauce",
        price_cents: 1250,
      },
      {
        name: "Lamb Rogan Josh",
        description: "Slow-cooked lamb in aromatic curry sauce",
        price_cents: 1350,
      },
      {
        name: "Garlic Naan",
        description: "Oven-baked flatbread with garlic and butter",
        price_cents: 350,
      },
    ],
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM menu_items");
    await client.query("DELETE FROM restaurants");
    await client.query("ALTER SEQUENCE restaurants_id_seq RESTART WITH 1");
    await client.query("ALTER SEQUENCE menu_items_id_seq RESTART WITH 1");

    for (const restaurant of RESTAURANTS) {
      const { rows } = await client.query(
        `INSERT INTO restaurants (name, cuisine, address, lat, lng, rating, delivery_time_minutes, image_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [
          restaurant.name,
          restaurant.cuisine,
          restaurant.address,
          restaurant.lat,
          restaurant.lng,
          restaurant.rating,
          restaurant.delivery_time_minutes,
          restaurant.image_url,
        ],
      );
      const restaurantId = rows[0].id;
      for (const item of restaurant.menu) {
        await client.query(
          `INSERT INTO menu_items (restaurant_id, name, description, price_cents) VALUES ($1, $2, $3, $4)`,
          [restaurantId, item.name, item.description, item.price_cents],
        );
      }
    }

    await client.query("COMMIT");
    console.log(`Seeded ${RESTAURANTS.length} restaurants with menus.`);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
