import React from "react";
import { Link } from "react-router-dom";

export default function ProductList({ products }) {
  return (
    <div className="container">
      <h1>Mobile Store</h1>
      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-12">
            <div>
              <Link to={`/products/${p.id}`}>
                <div
                  className="row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: 100, marginRight: "15px" }}
                  />
                  <div>
                    <h3>{p.name}</h3>
                    <p>${p.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
