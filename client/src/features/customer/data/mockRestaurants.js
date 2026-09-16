// Temporary stand-in for GET /api/restaurants — same shape the real
// endpoint will return, so swapping this for a fetch call later is
// a one-line change in RestaurantsPage, not a rewrite.
export const mockRestaurants = [
  {
    id: 1,
    name: "Basil & Bloom",
    cuisine: "Thai",
    address: "12 Mannerheimintie, Helsinki",
    rating: 4.7,
    deliveryTimeMinutes: 25,
    isOpen: true,
    image: "https://picsum.photos/seed/basil-bloom/400/240",
  },
  {
    id: 2,
    name: "Nonna\u2019s Table",
    cuisine: "Italian",
    address: "4 Aleksanterinkatu, Helsinki",
    rating: 4.5,
    deliveryTimeMinutes: 35,
    isOpen: true,
    image: "https://picsum.photos/seed/nonnas-table/400/240",
  },
  {
    id: 3,
    name: "Seoul Kitchen",
    cuisine: "Korean",
    address: "9 Fredrikinkatu, Helsinki",
    rating: 4.8,
    deliveryTimeMinutes: 20,
    isOpen: false,
    image: "https://picsum.photos/seed/seoul-kitchen/400/240",
  },
  {
    id: 4,
    name: "Green Bowl Co.",
    cuisine: "Healthy / Salads",
    address: "21 Runeberginkatu, Helsinki",
    rating: 4.3,
    deliveryTimeMinutes: 30,
    isOpen: true,
    image: "https://picsum.photos/seed/green-bowl/400/240",
  },
];
