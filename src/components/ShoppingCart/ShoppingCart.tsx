import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../store/store";
import { selectCart, removeItem } from "../../Slices/cartSlice";
import "./ShoppingCart.css";

const ShoppingCart: React.FC = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>
              <span>
                {item.name} - €{item.price} - Quantity: {item.count}
              </span>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Total Price: €{cart.totalPrice}</p>
    </div>
  );
};

export default ShoppingCart;
