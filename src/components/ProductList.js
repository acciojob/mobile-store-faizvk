import React from "react";
import { Link } from "react-router-dom";

export default function ProductList({ products }) {
  return (
    <div>
      <h1>Mobile Store</h1>
      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <Link to={`/products/${p.id}`} className="btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
