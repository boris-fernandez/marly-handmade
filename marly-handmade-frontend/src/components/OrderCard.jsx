export function OrderCard({ status, image, title, subtitle, price, quantity, onAdd, onDelete }) {
  return (
    <div className="flex items-center space-x-4 border rounded p-2">
      <img src={image} alt={title} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <p className="text-sm">Status: {status}</p>
        <p className="text-sm">Precio: ${price} x {quantity}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <button onClick={onAdd} className="bg-gray-200 px-2 rounded">+</button>
        <button onClick={onDelete} className="bg-red-200 px-2 rounded">×</button>
      </div>
    </div>
  );
}
