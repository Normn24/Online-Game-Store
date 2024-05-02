import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.scss";

export default function Header({ cartItemsCount, favoritesCount }) {
  return (
    <>
      <NavLink to="/basket">
        <span>
          <i className="fa fa-shopping-cart"></i>
          {cartItemsCount}
        </span>
      </NavLink>

      <NavLink to="/favourites">
        <span>
          <i className="fa fa-heart"></i>
          {favoritesCount}
        </span>
      </NavLink>
    </>
  );
}

Header.propTypes = {
  cartItemsCount: PropTypes.number,
  favoritesCount: PropTypes.number,
};
