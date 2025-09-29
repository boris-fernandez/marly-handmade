export default function MarlyCollections() {
    const products = [
        {
            name: "BEST SELLERS",
            image:
                "/public/BestSellers.png",
            link: "/product/best-sellers",
        },
        {
            name: "SEA COLLECTION",
            image:
                "/public/SeaCollection.png",
            link: "/product/wild-flowers",
        },
        {
            name: "MATARITA COLLECTION",
            image:
                "/public/MataritaCollection.png",
            link: "/product/interplanets",
        },
    ];

    return (
        <div className="px-6 py-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">MARLY Collections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.name}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                        <a href={product.link}>
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-center">{product.name}</h3>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}