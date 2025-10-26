import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

function SidebarProducts() {
  const [openSections, setOpenSections] = useState({
    price: false,
    material: false,
    productType: false,
    sortBy: true
  });

  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [sortBy, setSortBy] = useState('best-selling');

  const materials = [
    'Polymer Clay',
    'Copper Wire',
    'Resin',
    'Textile'
  ];

  const productTypes = [
    'Bracelets',
    'Earrings',
    'Necklaces',
    'Rings'
  ];

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleMaterial = (material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const toggleProductType = (type) => {
    setSelectedProductTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <aside className="w-full md:w-72 bg-white px-8 py-10 flex-shrink-0">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-12 tracking-wide flex flex-wrap items-center">
        <Link 
          to="/" 
          className="hover:text-gray-600 cursor-pointer" 
          style={{ color: '#997C71' }}
        >
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="uppercase" style={{ color: '#997C71' }}>SEA COLLECTION</span>
      </nav>

      {/* Price Filter */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left py-2 mb-4"
        >
          <span className="text-base font-light" style={{ color: '#997C71' }}>Price</span>
          {openSections.price ? (
            <Minus className="w-4 h-4 stroke-[1.5]" style={{ color: '#997C71' }} />
          ) : (
            <Plus className="w-4 h-4 stroke-[1.5]" style={{ color: '#997C71' }} />
          )}
        </button>

        {openSections.price && (
          <div className="pl-1 mt-5">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs mb-2" style={{ color: '#997C71' }}>Min</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                  placeholder="$0"
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300"
                  style={{ color: '#997C71' }}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-2" style={{ color: '#997C71' }}>Max</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                  placeholder="$200"
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300"
                  style={{ color: '#997C71' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Material Filter */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('material')}
          className="flex items-center justify-between w-full text-left py-2 mb-4"
        >
          <span className="text-base font-light" style={{ color: '#997C71' }}>Material</span>
          {openSections.material ? (
            <Minus className="w-4 h-4 stroke-[1.5]" style={{ color: '#997C71' }} />
          ) : (
            <Plus className="w-4 h-4 stroke-[1.5]" style={{ color: '#997C71' }} />
          )}
        </button>

        {openSections.material && (
          <div className="space-y-3 pl-1 mt-5">
            {materials.map((material) => (
              <label key={material} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(material)}
                  onChange={() => toggleMaterial(material)}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                  style={{ accentColor: '#997C71' }}
                />
                <span className="ml-3 text-sm font-light" style={{ color: '#997C71' }}>
                  {material}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Product Type Filter */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('productType')}
          className="flex items-center justify-between w-full text-left py-2 mb-4"
        >
          <span className="text-base font-light" style={{ color: '#997C71' }}>Product type</span>
          {openSections.productType ? (
            <Minus className="w-4 h-4 stroke-[1.5]" style={{ color: '#997C71' }} />
          ) : (
            <Plus className="w-4 h-4 stroke-[1.5]" style={{ color: '#997C71' }} />
          )}
        </button>

        {openSections.productType && (
          <div className="space-y-3 pl-1 mt-5">
            {productTypes.map((type) => (
              <label key={type} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedProductTypes.includes(type)}
                  onChange={() => toggleProductType(type)}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                  style={{ accentColor: '#997C71' }}
                />
                <span className="ml-3 text-sm font-light" style={{ color: '#997C71' }}>
                  {type}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort By */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('sortBy')}
          className="flex items-center justify-between w-full text-left py-2 mb-4"
        >
          <span className="text-base font-light" style={{ color: '#997C71' }}>Sort by</span>
          {openSections.sortBy ? (
            <Minus className="w-4 h-4 stroke-[1.5]" style={{ color: '#997C71' }} />
          ) : (
            <Plus className="w-4 h-4 stroke-[1.5]" style={{ color: '#997C71' }} />
          )}
        </button>

        {openSections.sortBy && (
          <div className="space-y-4 pl-1 mt-5">
            {[
              { value: 'best-selling', label: 'Best selling' },
              { value: 'price-low-high', label: 'Price, low to high' },
              { value: 'price-high-low', label: 'Price, high to low' }
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-5 h-5 border-2 rounded-full cursor-pointer transition-all"
                    style={{
                      borderColor: sortBy === option.value ? '#997C71' : '#d1d5db',
                      backgroundColor: sortBy === option.value ? '#997C71' : 'transparent'
                    }}
                  />
                  {sortBy === option.value && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <span className="ml-3 text-sm font-light" style={{ color: '#997C71' }}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default SidebarProducts;
