import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../store/store";
import { selectCart, removeItem } from "../../Slices/cartSlice";
import trashIcon from "/icons/trashIcon.svg";
import emojiIcon from "/img/iconSadCart.png";
import "./ShoppingCart.css";

const ShoppingCart: React.FC = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const autoCloseTimeout = 1800;

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeItem(itemId));

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, autoCloseTimeout);
  };

  return (
    <div>
      <h2 className="shoppingCartTitle">Shopping Cart</h2>
      <div className="cartContainer">
        {cart.items.length === 0 ? (
          <p className="emptyCart">
            Your cart is empty...{" "}
            <img src={emojiIcon} alt="Sad face" className="emojiIcon" />
          </p>
        ) : (
          <ul className="coursesList">
            {cart.items.map((item) => (
              <li className="addedCourse" key={item.id}>
                <span className="itemName">{item.name}</span>
                <span className="itemCount">{item.count}</span>
                <span className="itemPrice">€{item.price}</span>
                <img
                  src={trashIcon}
                  alt="Remove"
                  className="removeBtn"
                  onClick={() => handleRemoveFromCart(item.id)}
                />
              </li>
            ))}
          </ul>
        )}
        <p className="totalPrice">Total Price: €{cart.totalPrice}</p>

        {showPopup && (
          <div className="popupDelete">
            <div className="popupInfo">
              <p>Done!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
