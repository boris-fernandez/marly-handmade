import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminSidebar from "../components/AdminSidebar";
import { useProductos } from "../contexts/ProductoContext";

export default function ProductRegister() {
  const { formData, setFormData, handleImageUpload, handleSubmit, loading } =
    useProductos();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div
        className={`flex min-h-[calc(100vh-8rem)] bg-gray-50 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-[230px]" : "lg:ml-0"
        }`}
      >
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <main
          className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 lg:p-12"
          onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Product Register
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Add new handmade products to your catalog
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6 sm:p-8"
            >
              {/* === IMAGE UPLOADS === */}
              <div className="space-y-6">
                {/* Main Image */}
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "main")}
                    className="hidden"
                  />
                  {formData.mainImage ? (
                    <img
                      src={URL.createObjectURL(formData.mainImage)}
                      alt="Main"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400 mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 16l4-4a3 3 0 014 0l4 4m0 0l4-4a3 3 0 014 0l4 4M3 10h18"
                        />
                      </svg>
                      <span className="text-gray-600 font-medium">
                        Upload Main Image
                      </span>
                    </>
                  )}
                </label>

                {/* Additional Images */}
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <label
                      key={i}
                      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "additional")}
                        className="hidden"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-400 mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 16l4-4a3 3 0 014 0l4 4m0 0l4-4a3 3 0 014 0l4 4M3 10h18"
                        />
                      </svg>
                      <span className="text-xs text-gray-600">Upload</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* === FORM FIELDS === */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Material, Stock, Price */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Material
                    </label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) =>
                        setFormData({ ...formData, material: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#997C71] hover:bg-[#85695F] text-[#F5E3C3] font-semibold py-3 px-6 rounded-lg shadow-sm transition-all"
                >
                  {loading ? "Uploading..." : "Upload Product"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
