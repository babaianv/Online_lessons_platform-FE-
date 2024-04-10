import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
import {
  selectCart,
  fetchDeleteCourseFromCart,
  fetchDeleteAllCourseFromCart,
  fetchBuyAllCoursesFromCart,
  fetchCart,
  removeItem,
  removeAllItems,
} from "../../slices/cartSlice";
import trashIcon from "/icons/trashIcon.svg";
import emojiIcon from "/img/iconSadCart.png";
import paypalIcon from "/icons/payPal.svg";
import "./ShoppingCart.css";
import { selectUser } from "../../slices/userSlice";
import { AppDispatch } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface DeleteCourseFromCartData {
  cartId: number | undefined;
  courseId: number | undefined;
}

const ShoppingCart: React.FC = () => {
  const cart = useSelector(selectCart);
  const dispatch: AppDispatch = useAppDispatch();
  const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState<boolean>(false);
  const [paypalChecked, setPaypalChecked] = useState<boolean>(false);
  const autoCloseTimeout = 1800;
  const user = useAppSelector(selectUser);
  const cartId = user.userInfo?.cartId;

  // const fetchCartItems = async (cartId: number) => {
  //   try {
  //     const response = await instance.get(`/cart/${cartId}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching cart items:", error);
  //     return null;
  //   }
  // };

  // if (cartId !== undefined) {
  //   fetchCartItems(cartId)
  //     .then((a) => {
  //       console.log("Cart items:", a);
  //     })
  //     .catch((error) => {
  //       console.error("Error occurred:", error);
  //     });
  // } else {
  //   console.log(userInfo);
  //   console.error("Cart ID is undefined");
  // }

  const handleRemoveFromCart = async (itemId: number) => {
    dispatch(removeItem(itemId));
    const deleteCourseData: DeleteCourseFromCartData = {
      cartId: cartId,
      courseId: itemId,
    };
    await dispatch(fetchDeleteCourseFromCart(deleteCourseData));

    setShowRemovePopup(true);

    setTimeout(() => {
      setShowRemovePopup(false);
    }, autoCloseTimeout);
  };

  const handleRemoveAllFromCart = async () => {
    dispatch(removeAllItems());
    await dispatch(fetchDeleteAllCourseFromCart(cartId));

    setShowRemovePopup(true);

    setTimeout(() => {
      setShowRemovePopup(false);
    }, autoCloseTimeout);
  };

  const handlePayNow = async () => {
    if (paypalChecked) {
      try {
        const response = await dispatch(fetchBuyAllCoursesFromCart(cartId));

        if (response.meta.requestStatus !== "rejected") {
          setShowPaymentPopup(true);
          setTimeout(() => {
            setShowPaymentPopup(false);
          }, autoCloseTimeout);
          dispatch(fetchCart(cartId));
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

  useEffect(() => {
    if (cartId) {
      dispatch(fetchCart(cartId));
    }
  }, [cartId, dispatch]);

  console.log(cart);

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
