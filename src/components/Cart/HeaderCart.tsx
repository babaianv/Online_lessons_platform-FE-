import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../Slices/cartSlice";

const HeaderCart = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce(
    (acc: number, item: { count: number }) => acc + item.count,
    0
  );
  return (
    <>
      <div>
        <span>{totalPrice} ₽</span>
      </div>
      <div></div>
      <div>
        <span>
          Cart
          {totalCount}
        </span>
      </div>
    </>
  );
};

export default HeaderCart;
