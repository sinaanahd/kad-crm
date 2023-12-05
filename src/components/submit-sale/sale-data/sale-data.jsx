import React, { useEffect, useState } from "react";
import magnifier from "../../../asset/images/leads/magnifier.svg";
import arrow from "../../../asset/images/make-lead/arrow-up.svg";
import convert_to_persian from "../../functions/convert-to-persian";
import axios from "axios";
import urls from "../../../urls/url";
import LittleLoading from "../../reuseables/little-loading";
import split_in_three from "../../functions/spilit_in_three";

import trash from "../../../asset/images/make-sale/trash.svg";

const products_local =
  JSON.parse(localStorage.getItem("all-products")) || false;
const SaleData = () => {
  const [products, set_products] = useState(products_local);
  const [cart, set_cart] = useState(false);
  const [percent, set_percent] = useState(0);
  const [open_select, set_open_select] = useState(false);
  useEffect(() => {
    axios
      .get(urls.products)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          set_products(response);
          localStorage.setItem("all-products", JSON.stringify(response));
          set_cart(response.slice(0, 5));
        } else {
          alert("مشکلی پیش آمده");
          console.log(error);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی پیش آمده");
      });
  }, []);
  const handle_percent = (e) => {
    // console.log(e.target.value);
    const value = e.target.value;
    set_percent(value);
    console.log(value);
  };
  const handle_open_select = (entry) => {
    if (entry === open_select) {
      set_open_select(false);
    } else {
      set_open_select(entry);
    }
  };
  return (
    <section className="sale-details-wrapper">
      <div className="box-style shop-col">
        <div className="section-header">
          <span className="header-title">همه محصولات </span>
          <span className="header-input-place">
            <img src={magnifier} alt="جستجو" />
            <input type="number" placeholder="جستجوی محصول" />
          </span>
        </div>
        <div className="products-wrapper">
          {products ? (
            products.slice(0, 10).map((p) => (
              <div key={p.product_id} className="product-item">
                <span className="product-name">{p.product_title}</span>
                <span className="prices-wrapper">
                  <span className="price-label">قیمت : </span>
                  <span className="price-box">
                    {split_in_three(convert_to_persian(p.product_price))}
                    تومان
                  </span>
                </span>
                <button className="add-to-cart-btn">اضافه کردن محصول</button>
                <span className="product-type">{p.product_type}</span>
              </div>
            ))
          ) : (
            <LittleLoading />
          )}
        </div>
        <div className="paginiation-wrapper">
          <span className="arrow-span next-span">
            <img src={arrow} alt="بعدی" />
          </span>
          <span className="pagination-numbers">
            <span className="pagination-number active">
              {convert_to_persian(1)}
            </span>
            <span className="pagination-number">{convert_to_persian(2)}</span>
            <span className="pagination-number">{convert_to_persian(3)}</span>
            <span className="pagination-number">{convert_to_persian(4)}</span>
            <span className="pagination-number">{convert_to_persian(5)}</span>
            <span className="pagination-number">{convert_to_persian(6)}</span>
          </span>
          <span className="arrow-span">
            <img src={arrow} alt="قبلی" />
          </span>
        </div>
      </div>
      <div className="cart-col box-style">
        <div className="section-header">
          <span className="header-title">محصولات انتخاب شده</span>
        </div>
        <div className="cart-items">
          {cart ? (
            cart.map((p) => (
              <div key={p.product_id} className="cart-item">
                <span className="cart-item-name-price">
                  <span className="cart-item-name">{p.product_title}</span>
                  <span className="cart-item-price">
                    {split_in_three(convert_to_persian(p.product_price))} تومان
                  </span>
                </span>
                <button className="delete-btn">
                  <img src={trash} alt="حذف محصول" />
                </button>
              </div>
            ))
          ) : (
            <LittleLoading />
          )}
        </div>
        <div className="total-price-wrapper">
          <span className="total-price-label">قیمت کل</span>
          <span className="total-price-num">
            {split_in_three(convert_to_persian(1000000))} تومان
          </span>
        </div>
        <span className="sale-input-wrapper discount-wrapper">
          <span className="sale-input-label">درصد تخفیف</span>
          <span className="input-label-span discount-input-span">
            <input
              type="range"
              step={5}
              max={95}
              min={0}
              onInput={handle_percent}
            />
            <span className="min-max-values">
              <span className="min-value">{convert_to_persian(0)}</span>
              <span className="choosen-percent">
                <font>%</font>{" "}
                {convert_to_persian(percent) || convert_to_persian(0)}{" "}
              </span>
              <span className="max-value">{convert_to_persian(95)}</span>
            </span>
          </span>
        </span>
        <span className="custom-select-boxes-part">
          <div className="input-wrapper">
            <span className="input-label">شرایط فروش</span>
            <span className="input-span">
              <span
                className="custom-select-box"
                onClick={() => {
                  handle_open_select("pay_conditions");
                }}
              >
                <span className="custom-select-box-text">انتخاب کنید</span>
                <img src={arrow} alt="بازکردن" />
              </span>
              {open_select === "pay_conditions" ? (
                <span className="select-box-options">
                  <span className="select-option">عادی</span>
                  <span className="select-option">خاص</span>
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>
          <div className="input-wrapper">
            <span className="input-label">نوع فروش</span>
            <span className="input-span">
              <span
                className="custom-select-box"
                onClick={() => {
                  handle_open_select("pay_type");
                }}
              >
                <span className="custom-select-box-text">انتخاب کنید</span>
                <img src={arrow} alt="بازکردن" />
              </span>
              {open_select === "pay_type" ? (
                <span className="select-box-options">
                  <span className="select-option">قسطی</span>
                  <span className="select-option">نقدی</span>
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>
          <div className="input-wrapper">
            <span className="input-label">تعداد قسط</span>
            <span className="input-span">
              <span
                className="custom-select-box"
                onClick={() => {
                  handle_open_select("ghest");
                }}
              >
                <span className="custom-select-box-text">انتخاب کنید</span>
                <img src={arrow} alt="بازکردن" />
              </span>
              {open_select === "ghest" ? (
                <span className="select-box-options">
                  <span className="select-option">۲ قسط</span>
                  <span className="select-option">۳ قسط</span>
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>
        </span>
        <button className="submit-btn">ثبت اطلاعات</button>
      </div>
    </section>
  );
};

export default SaleData;
