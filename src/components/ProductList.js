import React from "react";
import { Link } from "react-router-dom";

export default function ProductList({ products }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mobile Store</h1>
      <div className="grid grid-cols-1 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded">
            <Link to={`/products/${p.id}`}>
              <div className="flex items-center row">
                <img src={p.image} alt={p.name} className="w-24 h-24 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p>${p.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
