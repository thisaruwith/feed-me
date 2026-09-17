export default function MenuItemCard({ item }) {
  const { name, description, priceCents } = item;

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="pr-4">
        <h4 className="font-medium text-gray-900">{name}</h4>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
      <span className="font-semibold text-gray-900 whitespace-nowrap">
        €{(priceCents / 100).toFixed(2)}
      </span>
    </div>
  );
}
