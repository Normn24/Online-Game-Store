import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeFromFavorites } from "../../redux/favourite.slice/favourite.slice";

export default function FavouriteCard({ product }) {
  const dispatch = useDispatch();
  const { name, price, image, article, genre } = product;
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorited(
      favorites.some((favProduct) => favProduct.article === article)
    );
  }, [article]);

  const handleRemoveFromFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorited) {
      const updatedFavorites = favorites.filter(
        (favProduct) => favProduct.article !== article
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      dispatch(removeFromFavorites(product));
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="favourite__card">
      <img src={image} alt={name} />
      <div className="favourite__body">
        <h3>{name}</h3>
        <p>Article: {article}</p>
        <p>Genre: {genre}</p>
        <div className="btnFavourite__container">
          <p>{price}$</p>
          <button
            className={`btn__favouriteStar ${
              isFavorited ? "active__favourite" : ""
            }`}
            onClick={handleRemoveFromFavorites}
          >
            &#9733;
          </button>
        </div>
      </div>
    </div>
  );
}

FavouriteCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    article: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
};
