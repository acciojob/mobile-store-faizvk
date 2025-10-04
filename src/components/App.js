import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import AdminPanel from "./AdminPanel";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 14",
      price: 999,
      description: "Latest iPhone",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Samsung S23",
      price: 899,
      description: "Flagship Samsung",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Pixel 8",
      price: 799,
      description: "Google Pixel",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "OnePlus 12",
      price: 699,
      description: "Fast and smooth",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Xiaomi 13",
      price: 599,
      description: "Affordable & powerful",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Oppo Find X6",
      price: 649,
      description: "Oppo flagship",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      name: "Vivo V27",
      price: 499,
      description: "Vivo phone",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      name: "Realme GT3",
      price: 399,
      description: "Budget flagship",
      image: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <Router>
      <div className="app">
        <nav>
          <span>
            <Link to="/">Home</Link>
          </span>
          <span>
            <Link to="/admin">Admin Panel</Link>
          </span>
        </nav>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <ProductList products={products} />}
          />
          <Route
            path="/products/:id"
            render={(props) => (
              <ProductDetails {...props} products={products} />
            )}
          />
          <Route
            path="/admin"
            render={() => (
              <AdminPanel products={products} setProducts={setProducts} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}
