import React, { useState } from "react";
import LittleLoading from "../../reuseables/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
import axios from "axios";

const PaymentsData = () => {
  return (
    <section className="payments-data-wrapper box-style">
      <div className="section-header">
        <span className="header-title">پرداخت ها</span>
      </div>
      <div className="payments-table">
        <div className="payment-row payment-header">
          <span className="payment-item pay-item-header">تاریخ</span>
          <span className="payment-item pay-item-header">مبلغ</span>
          <span className="payment-item pay-item-header">نوع پرداخت</span>
          <span className="payment-item pay-item-header">درصد تخفیف</span>
          <span className="payment-item pay-item-header">فیش واریزی</span>
          <span className="payment-item pay-item-header btn-col"></span>
        </div>
        <div className="payment-row">
          <span className="payment-item">۱۲ شهریور ۱۴۰۲</span>
          <span className="payment-item">
            {split_in_three(convert_to_persian(1000000))} تومان
          </span>
          <span className="payment-item">قسطی</span>
          <span className="payment-item">{convert_to_persian(50)} %</span>
          <span className="payment-item underline-file">file.jpg</span>
          <span className="payment-item btn-col">
            <input
              type="file"
              accept=".png ,.jpg ,.pdf ,.jpeg"
              name="upload-img"
              id="upload-img"
              className="hidden-input"
            />
            <label htmlFor="upload-img">انتخاب فایل</label>
          </span>
        </div>
        <div className="payment-row">
          <span className="payment-item">۱۲ شهریور ۱۴۰۲</span>
          <span className="payment-item">
            {split_in_three(convert_to_persian(1000000))} تومان
          </span>
          <span className="payment-item">قسطی</span>
          <span className="payment-item">{convert_to_persian(50)} %</span>
          <span className="payment-item underline-file">file.jpg</span>
          <span className="payment-item btn-col">
            <input
              type="file"
              accept=".png ,.jpg ,.pdf ,.jpeg"
              name="upload-img"
              id="upload-img"
              className="hidden-input"
            />
            <label htmlFor="upload-img">انتخاب فایل</label>
          </span>
        </div>
        <div className="payment-row">
          <span className="payment-item">۱۲ شهریور ۱۴۰۲</span>
          <span className="payment-item">
            {split_in_three(convert_to_persian(1000000))} تومان
          </span>
          <span className="payment-item">قسطی</span>
          <span className="payment-item">{convert_to_persian(50)} %</span>
          <span className="payment-item underline-file">file.jpg</span>
          <span className="payment-item btn-col">
            <input
              type="file"
              accept=".png ,.jpg ,.pdf ,.jpeg"
              name="upload-img"
              id="upload-img"
              className="hidden-input"
            />
            <label htmlFor="upload-img">انتخاب فایل</label>
          </span>
        </div>
      </div>
      <div className="final-payments-price">
        <div className="final-payment-price-label-wrapper">
          <span className="final-payment-price-label">مبلغ کل : </span>
          <span className="final-payment-price-num">
            {split_in_three(convert_to_persian(100000000))} تومان
          </span>
        </div>
        <button className="final-submit-btn">ثبت نهایی</button>
      </div>
    </section>
  );
};

export default PaymentsData;
