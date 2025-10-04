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
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 row">
        <input
          className="form-control"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          classNameHASE0
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
        <button className="btn" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {products.map((p, index) => (
          <div key={p.id} className="border p-4 rounded">
            <div className="flex items-center row">
              <Link to={`/products/${p.id}`}>
                <div className="flex items-center row">
                  <img src={p.image} alt={p.name} className="w-12 h-12 mr-4" />
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
                className="float-right btn"
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
