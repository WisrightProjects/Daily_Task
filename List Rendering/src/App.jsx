import { useState } from "react";
import "./App.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-icon">🛍️</div>

      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="category">{product.category}</p>
        <p className="price">${product.price}</p>
      </div>

      <button className="cart-button">Add to Cart</button>
    </div>
  );
}

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

function Filter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="filter-container">
      <label htmlFor="category-filter">
        Filter by Category
      </label>

      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All Categories</option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">📦</div>

      <h2>No Products Found</h2>

      <p>
        No products match the selected category.
      </p>
    </div>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 999,
    },
    {
      id: 2,
      name: "T-Shirt",
      category: "Clothing",
      price: 25,
    },
    {
      id: 3,
      name: "Headphones",
      category: "Electronics",
      price: 120,
    },
    {
      id: 4,
      name: "Running Shoes",
      category: "Footwear",
      price: 80,
    },
  ];

  const categories = [
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category ===
            selectedCategory
        );

  return (
    <div className="app">
      <header className="header">
        <h1>Product Store</h1>

        <p>
          Browse products by category
        </p>
      </header>

      <main className="container">
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={
            setSelectedCategory
          }
        />

        <div className="results">
          <h2>
            {selectedCategory === "All"
              ? "All Products"
              : `${selectedCategory} Products`}
          </h2>

          <span>
            {filteredProducts.length} product(s)
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductList
            products={filteredProducts}
          />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default App;