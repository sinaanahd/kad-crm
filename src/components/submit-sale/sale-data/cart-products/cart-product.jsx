import React, { useState } from "react";
import split_in_three from "../../../functions/spilit_in_three";
import convert_to_persian from "../../../functions/convert-to-persian";
import trash from "../../../../asset/images/make-sale/trash.svg";

const CartProduct = ({ handle_cart, p }) => {
  return (
    <div key={p.product_id} className="cart-item">
      <span className="cart-item-name-price">
        <span className="cart-item-name">{p.product_title}</span>
        <span className="cart-item-price">
          {split_in_three(convert_to_persian(p.product_price))} تومان
        </span>
      </span>
      <button
        className="delete-btn"
        onClick={() => {
          handle_cart(p);
        }}
      >
        <img src={trash} alt="حذف محصول" />
      </button>
    </div>
  );
};

export default CartProduct;
