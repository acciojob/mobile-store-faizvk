import React from "react";
import { Link } from "react-router-dom";

export default function ProductDetails({ match, products }) {
  const product = products.find((p) => p.id === parseInt(match.params.id));

  if (!product)
    return (
      <div>
        <h1>Product not found</h1>
        <Link to="/" className="btn">
          Back
        </Link>
      </div>
    );

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <Link to="/" className="btn">
        Back
      </Link>
    </div>
  );
}
