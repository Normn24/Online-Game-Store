import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, selectCart } from "../../redux/card.slice/card.slice";
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import BasketCard from "./BasketCard";
import "./Basket.scss";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);

  if (cartItems.length == 0)
    return (
      <div className="basket__container">
        <h1>Check out</h1>
        <h2>Your basket is empty</h2>
      </div>
    );

  return (
    <div className="checkout_container">
      <div className="form__container">
        <h1>Check out</h1>
        <CheckOutForm cartItems={cartItems} removeFromCart={removeFromCart} />
      </div>

      <div className="basket__container">
        <h1>Order Summary</h1>
        <>
          <div className="cart-list">
            {cartItems.map((product) => (
              <BasketCard
                key={product.article}
                product={product}
                removeFromCart={() => dispatch(removeFromCart(product))}
              />
            ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default CartPage;
