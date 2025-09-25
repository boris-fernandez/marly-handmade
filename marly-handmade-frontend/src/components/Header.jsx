import { Globe, Search, User, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="flex items-center justify-between px-10 py-4">

        {/* NAV */}
        <nav>
          <ul className="flex items-center space-x-10 font-serif font-medium">
            {/* SHOP */}
            <li className="relative group cursor-pointer">
              <a
                href="/shop"
                className="pb-2 border-b-2 border-transparent hover:border-[#040F2E] transition-colors duration-300"
              >
                Shop
              </a>
              <div className="absolute left-0 mt-2 hidden bg-white shadow-lg rounded-lg py-10 px-6 group-hover:block z-20 w-[700px]">
                <div className="grid grid-cols-4 gap-6">

                  {/* Column 1: Category */}
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1B2A40]">Category</h3>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Bracelets</li>
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Earrings</li>
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Necklaces</li>
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Rings</li>
                    </ul>
                  </div>

                  {/* Column 2: Material */}
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1B2A40]">Material</h3>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Polymer Clay</li>
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Copper Wire</li>
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Resin</li>
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Textile</li>
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Invisible Thread</li>
                    </ul>
                  </div>

                  {/* Column 3: Featured */}
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1B2A40]">Featured</h3>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Best Sellers</li>
                      <li className="hover:text-[#040F2E] transition-colors duration-200">Marly's Favorites</li>
                    </ul>
                  </div>

                  {/* Column 4: Clickable Image */}
                  <div className="relative flex justify-center items-center">
                    <a href="/marly-favorites" className="block relative group">
                      <img
                        src="/nayblueear.jpg"
                        className="w-40 h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[#F5E3C3] font-serif text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_3px_6px_rgba(0,0,0,1)]">
                        Marly's Favorites
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>

            {/* COLLECTIONS */}
            <li className="relative group cursor-pointer">
              <a
                href="/collections"
                className="pb-2 border-b-2 border-transparent hover:border-[#040F2E] transition-colors duration-300"
              >
                Collections
              </a>

              <div className="absolute left-0 mt-2 hidden bg-white shadow-lg rounded-lg py-10 px-6 group-hover:block z-20 w-[700px]">
                <div className="grid grid-cols-3 gap-6">

                  {/* Column 1: Collections List */}
                  <div>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li className="hover:text-[#040F2E] transition-colors duration-200">
                        SEA COLLECTION
                      </li>
                      <li className="hover:text-[#040F2E] transition-colors duration-200">
                        MATARITA COLLECTION
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: SEA COLLECTION Image */}
                  <div className="flex flex-col items-center">
                    <a href="/sea-collection"
                      className="block text-center text-[#2C3E5E] hover:text-[#040F2E] transition-colors duration-300">
                      <img
                        src="/sea-collection.jpg"
                        alt="Sea Collection"
                        className="w-40 h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                      />
                      <span className="mt-2 text-sm font-medium">
                        SEA COLLECTION
                      </span>
                    </a>
                  </div>

                  {/* Column 3: MATARITA COLLECTION Image */}
                  <div className="flex flex-col items-center">
                    <a href="/matarita-collection"
                      className="block text-center text-[#2C3E5E] hover:text-[#040F2E] transition-colors duration-300">
                      <img
                        src="/matarita-collection.jpg"
                        alt="Matarita Collection"
                        className="w-40 h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                      />
                      <span className="mt-2 text-sm font-medium">
                        MATARITA COLLECTION
                      </span>
                    </a>
                  </div>

                </div>
              </div>
            </li>
            {/* OUR STORY */}
            <li className="cursor-pointer">Our Story</li>
          </ul>
        </nav>

        {/* LOGO */}
        <header className="flex justify-center items-center px-6 py-4">
          <a href="/" className="flex items-center">
            <img
              src="/logoMarly.png"
              alt="Marly logo"
              className="h-10 w-auto cursor-pointer"
            />
          </a>
        </header>

        {/* ICONOS */}
        <div className="flex items-center space-x-4">
          {/* Selector de idioma */}
          <div className="relative inline-block">
            <select className="w-5 h-5 opacity-0 absolute inset-0 cursor-pointer">
              <option>Spanish</option>
              <option>English</option>
            </select>
            <Globe className="w-5 h-5 text-[#040F2E] pointer-events-none" />
          </div>
          {/* Selector de moneda */}
          <select className="rounded px-2 py-1 text-sm">
            <option>USD</option>
            <option>PEN</option>
            <option>EUR</option>
          </select>
          {/* Selector de buscador */}
          <Search className="w-5 h-5 cursor-pointer text-[#040F2E]" />
          {/* Selector de login */}
          <User className="w-5 h-5 cursor-pointer text-[#040F2E]" />
          {/* Selector de carrito */}
          <ShoppingCart className="w-5 h-5 cursor-pointer text-[#040F2E]" />
        </div>
      </div>
    </header>
  );
}