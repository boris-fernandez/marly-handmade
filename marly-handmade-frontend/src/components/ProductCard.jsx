export default function ProductCard({ product }) {
  return (
    <div className="group rounded-xl bg-white p-3 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" 
        />
      </div>

      <div className="mt-4">
        <h3 className="text-[#040F2F] font-semibold text-base group-hover:text-[#567690] transition-colors"> 
          {product.name}
        </h3>
        <p className="text-[#567690] font-medium text-base mt-1">${product.price}</p>
      </div>
    </div>
  );
}