export default function RestaurantCard({ restaurant }) {
  const { name, cuisine, address, rating, deliveryTimeMinutes, isOpen, image } =
    restaurant;

  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
            isOpen ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
          }`}
        >
          {isOpen ? "Open" : "Closed"}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{cuisine}</p>
        <p className="text-xs text-gray-400 mt-1">{address}</p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <span className="text-amber-500">★</span> {rating.toFixed(1)}
          </span>
          <span>{deliveryTimeMinutes} min</span>
        </div>
      </div>
    </article>
  );
}
