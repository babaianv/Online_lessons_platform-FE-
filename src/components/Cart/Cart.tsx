import React from "react";
import "./Cart.css";

const Cart = () => {
  return (
    <>
      <div>
        <button className="cartBtn">
          <img className="cartSign" src="./icons/cartIcon.svg" alt="cart" />
        </button>
      </div>
    </>
  );
};

export default Cart;
