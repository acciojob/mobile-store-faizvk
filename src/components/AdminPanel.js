import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminPanel({ products, setProducts }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price) return;
    const nextId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([
      ...products,
      { id: nextId, ...newProduct, price: parseFloat(newProduct.price) },
    ]);
    setNewProduct({ name: "", price: "", description: "", image: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (id, field, value) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const stopLink = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <div className="admin-form">
        <input
          className="form-control"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          className="form-control"
          placeholder="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          className="form-control"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <input
          className="form-control"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="admin-list row">
        {products.map((p) => (
          <div key={p.id} className="col-12">
            <Link to={`/products/${p.id}`}>
              <div
                className="row"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: 50, marginRight: "10px" }}
                />
                <div>
                  <input
                    className="form-control"
                    value={p.name}
                    onChange={(e) => handleEdit(p.id, "name", e.target.value)}
                    onClick={stopLink}
                  />
                  <input
                    className="form-control"
                    type="number"
                    value={p.price}
                    onChange={(e) => handleEdit(p.id, "price", e.target.value)}
                    onClick={stopLink}
                  />
                </div>
              </div>
            </Link>
            <button className="float-right" onClick={() => handleDelete(p.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
