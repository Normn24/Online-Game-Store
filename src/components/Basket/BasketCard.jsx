import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import { removeFromCart } from "../../redux/card.slice/card.slice";

export default function BasketCard({ product }) {
  const { name, price, image, article, genre } = product;
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteToCart = () => {
    openModal();
  };

  const handleConfirmDelete = () => {
    dispatch(removeFromCart(product));
    closeModal();
  };

  return (
    <div className="basket__card">
      <img src={image} alt={name} />
      <div className="basket__body">
        <div>
          <h3>{name}</h3>
          <p>Article: {article}</p>
          <p>Genre: {genre}</p>
        </div>
        <div className="btnBasket__container">
          <p>{price}$</p>
          <button className="btn__busket" onClick={handleDeleteToCart}>
            &times;
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={`Delete "${name}" to the basket?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

BasketCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    article: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
};
