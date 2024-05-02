import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCart } from "../../redux/card.slice/card.slice";
import {
  selectFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favourite.slice/favourite.slice";
import "./ProductCard.scss";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  const favorites = useSelector(selectFavorites);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { name, price, image, article, genre } = product;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddToCart = () => {
    openModal();
  };

  const handleAddToFavorites = () => {
    if (isFavorited) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const isFavorited = favorites.some(
    (favProduct) => favProduct.article === article
  );
  const isCartItems = cartItems.some(
    (cartProduct) => cartProduct.article === article
  );

  return (
    <div className="product__card">
      <img src={image} alt={name} />
      <div className="product__body">
        <h3>{name}</h3>
        <p>Article: {article}</p>
        <p>Genre: {genre}</p>
        <div className="button__container">
          <p>{price}$</p>
          <button className="btn__busket" onClick={handleAddToCart}>
            Add to busket
          </button>
          <button
            className={`btn__favourite ${
              isFavorited ? "active__favourite" : ""
            }`}
            onClick={handleAddToFavorites}
          >
            &#9733;
          </button>
        </div>
      </div>
      {isCartItems ? (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          message={`"${name}" is already in the basket`}
        />
      ) : (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          message={`Add "${name}" to the basket?`}
          onConfirm={() => {
            dispatch(addToCart(product));
            closeModal();
          }}
        />
      )}
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    article: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
};
