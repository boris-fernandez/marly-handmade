import React from "react";

function FiltersBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  uniqueCategories,
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionChange,
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Buscador */}
      <div className="relative flex-1 min-w-[250px]">
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
        />
      </div>

      {/* Categoría */}
      <div className="flex items-center gap-2">
        <label className="font-medium text-gray-700">Categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
        >
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Ordenamiento */}
      <div className="flex items-center gap-2">
        <label className="font-medium text-gray-700">Ordenar por:</label>
        <select
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
        >
          <option value="id">ID</option>
          <option value="nombre">Nombre</option>
          <option value="precio">Precio</option>
          <option value="stock">Stock</option>
        </select>

        <select
          value={sortDirection}
          onChange={(e) => onSortDirectionChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
    </div>
  );
}

export default FiltersBar;
