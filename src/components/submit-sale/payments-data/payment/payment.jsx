import React, { useState } from "react";
import convert_to_persian from "../../../functions/convert-to-persian";
import split_in_three from "../../../functions/spilit_in_three";
const Payment = ({ sale, payment, count, handleFileChange, file }) => {
  return (
    <div className="payment-row">
      <span className="payment-item">
        {new Date(payment.payment_creation_datetime).toLocaleDateString(
          "fa-ir"
        )}
        <br />
      </span>
      <span className="payment-item">
        {split_in_three(convert_to_persian(payment.payment_amount))} تومان
      </span>
      <span className="payment-item">
        {payment.is_beyane ? "بیعانه" : payment.is_ghest ? "قسطی" : "نقدی"}
      </span>
      <span className="payment-item">
        {convert_to_persian(sale.sale_discount_percent)} %
      </span>
      <span className="payment-item underline-file">
        {count === 0 ? (file ? file.name : "فیش وارد نشده") : "-"}
      </span>
      <span className="payment-item btn-col">
        {count === 0 ? (
          <>
            <input
              type="file"
              accept=".png ,.jpg ,.pdf ,.jpeg"
              name="upload-img"
              id="upload-img"
              className="hidden-input"
              onChange={(e) => {
                handleFileChange(e, payment.payment_id);
              }}
            />
            <label htmlFor="upload-img">انتخاب فایل</label>
          </>
        ) : (
          "-"
        )}
      </span>
    </div>
  );
};

export default Payment;
