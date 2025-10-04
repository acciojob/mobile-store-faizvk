import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminPanel({ products, setProducts }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  // Local edit state so admin can change fields and then Save
  const [edits, setEdits] = useState(
    products.reduce((acc, p) => {
      acc[p.id] = { ...p };
      return acc;
    }, {})
  );

  // Keep edits in sync when products change (e.g., after delete/add)
  React.useEffect(() => {
    setEdits(
      products.reduce((acc, p) => {
        acc[p.id] = { ...p };
        return acc;
      }, {})
    );
  }, [products]);

  const handleAdd = () => {
    if (!newProduct.name || newProduct.price === "") return;
    const nextId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const image = newProduct.image || "https://via.placeholder.com/150";
    setProducts([
      ...products,
      { id: nextId, ...newProduct, price: parseFloat(newProduct.price), image },
    ]);
    setNewProduct({ name: "", price: "", description: "", image: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleLocalEdit = (id, field, value) => {
    setEdits((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: field === "price" ? value : value },
    }));
  };

  const handleSave = (id) => {
    if (!edits[id]) return;
    const updated = { ...edits[id], price: parseFloat(edits[id].price) || 0 };
    setProducts(products.map((p) => (p.id === id ? updated : p)));
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
        {products.map((p, index) => {
          const local = edits[p.id] || { ...p };
          return (
            <div key={p.id} className="border p-4 rounded">
              <div className="flex items-center row">
                {/* Link only on image & name — inputs are editable without navigation */}
                <div className="flex items-center row flex-1">
                  <Link to={`/products/${p.id}`}>
                    <img
                      src={p.image || "https://via.placeholder.com/150"}
                      alt={p.name}
                      className="w-12 h-12 mr-4"
                    />
                  </Link>

                  <div className="flex-1">
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

                <div className="ml-4">
                  <button
                    className="float-right btn"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="float-right btn"
                    style={{ marginRight: 8 }}
                    onClick={() => handleSave(p.id)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
