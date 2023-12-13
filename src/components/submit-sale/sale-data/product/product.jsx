import React, { useState } from "react";
import split_in_three from "../../../functions/spilit_in_three";
import convert_to_persian from "../../../functions/convert-to-persian";
const Product = ({ p, handle_cart, cart, check_user_kelas }) => {
  return (
    <div className="product-item">
      <span className="product-name">{p.product_title}</span>
      <span className="prices-wrapper">
        <span className="price-label">قیمت : </span>
        <span className="price-box">
          {split_in_three(convert_to_persian(p.product_price))}
          تومان
        </span>
      </span>
      <button
        className={
          check_user_kelas(p.product_id)
            ? "add-to-cart-btn disable-btn"
            : "add-to-cart-btn"
        }
        onClick={() => {
          if (!check_user_kelas(p.product_id)) {
            handle_cart(p);
          }
        }}
        disabled={check_user_kelas(p.product_id)}
      >
        {check_user_kelas(p.product_id)
          ? "قبلا خریداری شده"
          : cart && cart.products_ids.includes(p.product_id)
          ? "حذف محصول"
          : "اضافه کردن محصول"}
      </button>
      <span className="product-type">{p.product_type}</span>
    </div>
  );
};

export default Product;
