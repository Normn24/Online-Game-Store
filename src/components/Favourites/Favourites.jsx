import { useSelector, useDispatch } from "react-redux";
import {
  selectFavorites,
  removeFromFavorites,
} from "../../redux/favourite.slice/favourite.slice";
import FavouriteCard from "./FavouriteCard";
import "./Favourites.scss";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  return (
    <div className="favourite__container">
      <h1>Favourite Page</h1>
      <div className="favourite__cards">
        {favorites.length == 0 ? (
          <div>
            <h2>Your favourite page is empty</h2>
          </div>
        ) : (
          <>
            {favorites.map((product) => (
              <FavouriteCard
                key={product.article}
                product={product}
                onRemoveFromFavorites={() =>
                  dispatch(removeFromFavorites(product))
                }
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
