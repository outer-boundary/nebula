import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

import "./styles/Section.css";
import { testProducts } from "./TestClothing";
import ProductIcon from "../product-icon/ProductIcon";
import IProduct from "../types/IProduct";
import { SectionType } from "../types/SectionType";

export default function Section({ section }: { section: SectionType }) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  // gets the products from the selected section
  useEffect(() => {
    let newProducts = [...testProducts];
    newProducts = newProducts.filter(
      (x) => x.section === section || section === SectionType.All || (section === SectionType.Sale && x.onSale)
    );
    setProducts(newProducts);
    setFilteredProducts(newProducts);
  }, [section]);

  // filters the products based on the search string and the product names
  function filterProducts() {
    const newFilteredProducts = [...products];
    searchFilter(newFilteredProducts);
    sortByFilter(newFilteredProducts);
    setFilteredProducts(newFilteredProducts);
  }

  function searchFilter(products: IProduct[]) {
    const searchString = (document.getElementsByClassName("search-input")[0] as HTMLInputElement).value;
    if (searchString.replace(/\s/g, "") === "") {
      setFilteredProducts(products);
      return;
    }

    const searchFilters = searchString
      .toLowerCase()
      .replace(/\S\W_|-/g, "")
      .split(" ");

    for (let i = 0; i < products.length; i++) {
      const productKeywords = products[i].name
        .toLowerCase()
        .replace(/\S\W_|-/g, "")
        .split(" ");

      for (const searchFilter of searchFilters) {
        if (productKeywords.every((keyword) => keyword !== searchFilter && searchFilter !== "")) {
          products.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }

  function sortByFilter(products: IProduct[]) {
    const option = (document.getElementById("sort-by-select") as HTMLInputElement).value;

    // for now while popularity and item release dates don't exist
    if (option !== "price-low-high" && option !== "price-high-low") return;

    switch (option) {
      case "price-low-high":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        products.sort((a, b) => b.price - a.price);
        break;
      default:
        console.log("Invalid sorting option");
        break;
    }
  }

  return (
    <div className="section">
      <div className="filters-container">
        <form className="filter search-container">
          <input type="text" className="search-input" />
          <button
            type="submit"
            className="search-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              filterProducts();
            }}
          >
            <FiSearch className="search-icon" />
          </button>
        </form>
        <div className="filter sort-by-container">
          <p className="sort-by-text">Sort By</p>
          <select name="" id="sort-by-select" onChange={() => filterProducts()}>
            <option value="most-popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price-low-high">Price Low to High</option>
            <option value="price-high-low">Price High to Low</option>
          </select>
        </div>
        <div className="filter category-container">
          <p className="category-text">Category</p>
        </div>
        <div className="filter size-container">
          <p className="size-text">Size</p>
        </div>
        <div className="filter material-container">
          <p className="material-text">Material</p>
        </div>

        <div className="filter price-range-container">
          <p className="price-range-text">Price Range</p>
        </div>
      </div>
      <div className="products-container">
        {filteredProducts.map((product, index) => (
          <ProductIcon product={product} key={index} />
        ))}
      </div>
    </div>
  );
}
