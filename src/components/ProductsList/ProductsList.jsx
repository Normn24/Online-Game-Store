import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
} from "../../redux/product.slice/product.slice";
import ProductCard from "../ProductCard/ProductCard";
import { addToCart } from "../../redux/card.slice/card.slice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favourite.slice/favourite.slice";
import "./ProductList.scss";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="product__list">
      {products.map((product) => (
        <ProductCard
          key={product.article}
          product={product}
          onAddToCart={() => dispatch(addToCart(product))}
          onAddToFavorites={() => dispatch(addToFavorites(product))}
          onRemoveFromFavorites={() => dispatch(removeFromFavorites(product))}
        />
      ))}
    </div>
  );
};

export default ProductList;
