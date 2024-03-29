import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../slices/cartSlice";
import { RootState } from "../../store/store";
import "./HeaderCart.css";

const HeaderCart = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const { items } = useSelector(selectCart);
  const totalCount = items.reduce(
    (acc: number, item: { count: number }) => acc + item.count,
    0
  );

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <div>
        <span>{totalCount}</span>
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
