import { Link } from "react-router-dom";

import { getKebabStyledString } from "../../helper/Helper";
import IProduct from "../types/IProduct";
import "./styles/ProductIcon.css";

export default function ProductIcon({ product }: { product: IProduct }) {
  return (
    <Link to={"/clothing/" + getKebabStyledString(product.name)} state={product} className="product-icon">
      <img src={product.imageUrls[0]} alt="" className="product-image" />
      <div className="product-details">
        <p className="name-text">{product.name}</p>
        <p className="price-text">${product.price}</p>
      </div>
    </Link>
  );
}
