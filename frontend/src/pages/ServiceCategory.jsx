import { servicesData } from "../data/servicesData";
import { useParams } from "react-router-dom";


export default function ServiceCategory() {
  const { serviceType } = useParams();
  const service = servicesData[serviceType];

  if (!service) {
    return <div className="text-white p-20">Service Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-10 py-20">
      
      <h1 className="text-4xl font-bold text-red-600 mb-12">
        {service.title}
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {service.products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 p-6 rounded-xl hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-4">
              {product.name}
            </h2>

            <p className="text-red-500 text-lg font-bold mb-6">
              ₹{product.price}
            </p>

            <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
              View Details
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
