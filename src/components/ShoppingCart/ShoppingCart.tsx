import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../store/store";
import { selectCart,removeAllItems, removeItem } from "../../slices/cartSlice";
import trashIcon from "/icons/trashIcon.svg";
import emojiIcon from "/img/iconSadCart.png";
import paypalIcon from "/icons/payPal.svg";
import "./ShoppingCart.css";

const ShoppingCart: React.FC = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState<boolean>(false);
  const [paypalChecked, setPaypalChecked] = useState<boolean>(false);
  const autoCloseTimeout = 1800;

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeItem(itemId));

    setShowRemovePopup(true);

    setTimeout(() => {
      setShowRemovePopup(false);
    }, autoCloseTimeout);
  };

  const handleRemoveAllFromCart = () => {
    dispatch(removeAllItems());

    setShowRemovePopup(true);

    setTimeout(() => {
      setShowRemovePopup(false);
    }, autoCloseTimeout);
  };

  const handlePayNow = async () => {
    if (paypalChecked) {
      try {
        const response = await fetch("/api/cart/buy/{cartId}", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          setShowPaymentPopup(true);
          setTimeout(() => {
            setShowPaymentPopup(false);
          }, autoCloseTimeout);
        } else {
          throw new Error("Payment failed!");
        }
      } catch (error) {
        console.error("Error occurred during payment:", error);
      }
    } else {
      alert("Please select PayPal to proceed with the payment.");
    }
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
          <div>
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
            <button className="removeAllBtn" onClick={handleRemoveAllFromCart}>
              Remove All
            </button>
            <p className="totalPrice">Total Price: €{cart.totalPrice}</p>
            <div className="paypalCheckout">
              <input
                type="checkbox"
                id="paypalCheckbox"
                checked={paypalChecked}
                onChange={() => setPaypalChecked(!paypalChecked)}
              />
              <label htmlFor="paypalCheckbox">
                <img src={paypalIcon} alt="PayPal" className="paypalIcon" />
              </label>
              <button
                className="payNowBtn"
                onClick={handlePayNow}
                disabled={!paypalChecked}
              >
                Pay Now
              </button>
            </div>
          </div>
        )}

        {showRemovePopup && (
          <div className="popupDelete">
            <div className="popupInfo">
              <p>Done!</p>
            </div>
          </div>
        )}

        {showPaymentPopup && (
          <div className="popupPayment">
            <div className="popupInfo">
              <p>Payment successful!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
