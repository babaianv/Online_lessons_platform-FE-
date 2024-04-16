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
import { toast } from "react-toastify";

interface DeleteCourseFromCartData {
  cartId: number | undefined;
  courseId: number | undefined;
}

const ShoppingCart: React.FC = () => {
  const cart = useSelector(selectCart);
  const dispatch: AppDispatch = useAppDispatch();
  const [paypalChecked, setPaypalChecked] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const cartId = user.userInfo?.cartId;
  const totalPrice = cart.items.reduce(
    (acc: number, item: { price: number }) => acc + item.price,
    0
  );

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
    dispatch(fetchCart(cartId));
    toast.success("Done!", { toastId: "remove_from_cart" });
  };

  const handleRemoveAllFromCart = async () => {
    dispatch(removeAllItems());
    await dispatch(fetchDeleteAllCourseFromCart(cartId));

    toast.success("Done!", { toastId: "remove_all_from_cart" });
  };

  const handlePayNow = async () => {
    if (paypalChecked) {
      try {
        const response = await dispatch(fetchBuyAllCoursesFromCart(cartId));

        if (response.meta.requestStatus !== "rejected") {
          toast.success("Payment successful!", { toastId: "payment_success" });
          dispatch(fetchCart(cartId));
        } else {
          throw new Error("The course has already been purchased!");
        }
      } catch (error) {
        toast.error("Error occurred during payment: " + error, {
          toastId: "payment_error",
        });
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
                  <span className="itemName">{item.title}</span>
                  <span className="itemCount">1</span>
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
            <p className="totalPrice">Total Price: €{totalPrice}</p>
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
      </div>
    </div>
  );
};

export default ShoppingCart;
