import React from "react";
import { Link } from "react-router-dom";

export default function ProductDetails({ match, products }) {
  const product = products.find((p) => p.id === parseInt(match.params.id));
  if (!product) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/" className="btn">
          Back
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-48 h-48 mb-4" />
      <p className="mb-2">{product.description}</p>
      <p className="mb-4">${product.price}</p>
      <Link to="/" className="btn">
        Back
      </Link>
    </div>
  );
}
