import { useParams } from "react-router-dom";
import { servicesData } from "../data/servicesData";

export default function ServiceCategory() {
  const { serviceType } = useParams();
  const service = servicesData[serviceType];

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl text-red-500">Service Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-8 md:px-16 py-24">
      
      {/* Service Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-16 text-center">
        {service.title}
      </h1>

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {service.products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg 
                       hover:scale-105 hover:shadow-red-900/40 
                       transition duration-300"
          >
            {/* Product Image */}
            <img
              src={`${product.image}?auto=format&fit=crop&w=600&q=80`}
              alt={product.name}
              className="h-52 w-full object-cover"
            />

            <div className="p-6">
              
              {/* Product Name */}
              <h2 className="text-xl font-semibold mb-3">
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-5">
                {product.description}
              </p>

              {/* Price + Button */}
              <div className="flex justify-between items-center">
                <span className="text-red-500 text-lg font-bold">
                  ₹{product.price}
                </span>

                <button className="bg-red-600 px-4 py-2 rounded-md 
                                   hover:bg-red-700 transition">
                  View Details
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}