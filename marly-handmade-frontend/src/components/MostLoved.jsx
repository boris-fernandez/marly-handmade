export default function MostLoved() {
  const products = [
    {
      name: "Sea Conchitas",
      price: 62,
      image: "/SeaConchitas.png",
      link: "/product/sea-conchitas",
    },
    {
      name: "Wild Flowers",
      price: 80,
      image: "/WildFlowers.png",
      link: "/product/wild-flowers",
    },
    {
      name: "Interplanets",
      price: 52,
      image: "/Interplanets.png",
      link: "/product/interplanets",
    },
  ];
  

  return (
    <div className='px-6 py-10'>
      <h2 className='text-2xl font-semibold mb-6'>Most Loved</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {products.map((product) => (
          <div
            key={product.name}
            className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition'
          >
            <a href={product.link}>
              <div className='aspect-square overflow-hidden'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='p-4'>
                <h3 className='text-lg font-medium'>{product.name}</h3>
                <p className='text-gray-600'>${product.price}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
