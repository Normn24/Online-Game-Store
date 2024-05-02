import { useEffect } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./components/ProductsList/ProductsList";
import Header from "./components/Header/Header";
import Favourites from "./components/Favourites/Favourites";
import Basket from "./components/Basket/Basket";
import { fetchProducts } from "./redux/product.slice/product.slice";
import { loadCartFromLocalStorage } from "./redux/card.slice/card.slice";
import { loadFavouritesFromLocalStorage } from "./redux/favourite.slice/favourite.slice";
import "./AppRouters.scss";

export default function AppRouters() {
  const dispatch = useDispatch();

  const cartItemsCount = useSelector((state) => state.cart.length);
  const favoritesCount = useSelector((state) => state.favorites.length);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(loadCartFromLocalStorage());
    dispatch(loadFavouritesFromLocalStorage());
  }, [dispatch]);

  return (
    <Router>
      <header className="header">
        <div className="header__links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/basket" style={{ marginLeft: "10px" }}>
            Basket
          </NavLink>
          <NavLink to="/favourites" style={{ marginLeft: "10px" }}>
            Favourites
          </NavLink>
        </div>

        <div className="header__icon">
          <Header
            cartItemsCount={cartItemsCount}
            favoritesCount={favoritesCount}
          />
        </div>
      </header>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
      <div className="app"></div>
    </Router>
  );
}
