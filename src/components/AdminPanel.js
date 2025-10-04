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
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              [field]: field === "price" ? parseFloat(value) || 0 : value,
            }
          : p
      )
    );
  };

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      {/* Fix 2: Added .row class and wrapped inputs in .col-sm-4 divs */}
      <div className="admin-form row">
        <div className="col-sm-4">
          <input
            className="form-control"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>
        <div className="col-sm-4">
          <input
            className="form-control"
            placeholder="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <div className="col-sm-4">
          <input
            className="form-control"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </div>
        <div className="col-sm-4">
          <input
            className="form-control"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
        </div>
        <div className="col-sm-4">
          <button className="btn" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
      <div className="admin-list row">
        {products.map((p) => (
          <div key={p.id} className="col-12">
            {/* Fix 1: Added a wrapping div around the Link and button */}
            <div>
              <Link to={`/products/${p.id}`}>
                <div className="row">
                  <img src={p.image} alt={p.name} style={{ width: 50 }} />
                  <div>
                    <input
                      className="form-control"
                      value={p.name}
                      onChange={(e) => handleEdit(p.id, "name", e.target.value)}
                    />
                    <input
                      className="form-control"
                      type="number"
                      value={p.price}
                      onChange={(e) =>
                        handleEdit(p.id, "price", e.target.value)
                      }
                    />
                  </div>
                </div>
              </Link>
              <button
                className="float-right"
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
