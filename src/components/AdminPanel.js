import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminPanel({ products, setProducts }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [edits, setEdits] = useState({});

  // initialize editable state
  useEffect(() => {
    const initial = {};
    products.forEach((p) => {
      initial[p.id] = { ...p };
    });
    setEdits(initial);
  }, [products]);

  const handleAdd = () => {
    if (!newProduct.name || newProduct.price === "") return;
    const nextId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const image = newProduct.image || "https://via.placeholder.com/150";
    setProducts([
      ...products,
      {
        id: nextId,
        ...newProduct,
        price: parseFloat(newProduct.price),
        image,
      },
    ]);
    setNewProduct({ name: "", price: "", description: "", image: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleLocalEdit = (id, field, value) => {
    setEdits((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = (id) => {
    const updated = { ...edits[id], price: parseFloat(edits[id].price) || 0 };
    setProducts(products.map((p) => (p.id === id ? updated : p)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Add New Product */}
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

      {/* Product List */}
      <div className="grid grid-cols-1 gap-4">
        {products.map((p) => {
          const local = edits[p.id] || p;
          return (
            <React.Fragment key={p.id}>
              {/* Cypress expects nth-child(n) > a */}
              <Link
                to={`/products/${p.id}`}
                className="block border p-4 rounded"
              >
                <div className="row flex items-center">
                  <img
                    src={p.image || "https://via.placeholder.com/150"}
                    alt={p.name}
                    className="w-12 h-12 mr-4"
                  />
                  <div>
                    <input
                      className="form-control"
                      value={local.name}
                      onChange={(e) =>
                        handleLocalEdit(p.id, "name", e.target.value)
                      }
                    />
                    <input
                      className="form-control"
                      type="number"
                      value={local.price}
                      onChange={(e) =>
                        handleLocalEdit(p.id, "price", e.target.value)
                      }
                    />
                  </div>
                </div>
              </Link>

              {/* Buttons come after the <a> so clicks don't navigate */}
              <div className="mt-2">
                <button
                  className="float-right btn"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
                <button
                  className="float-right btn mr-2"
                  onClick={() => handleSave(p.id)}
                >
                  Save
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
