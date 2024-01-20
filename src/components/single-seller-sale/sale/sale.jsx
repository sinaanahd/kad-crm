import React, { useContext, useState } from "react";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
import Payment from "../payment/payment";
const Sale = ({ s, sales, set_sales }) => {
  const { all_users, products } = useContext(DataContext);
  const user = all_users
    ? all_users.find((u) => u.phone_number === s.buyer_phone_number)
    : false;
  const prods = products
    ? products.filter((p) => s.payments[0].products_ids.includes(p.product_id))
    : false;
  const [show_prods, set_show_prods] = useState(false);
  const [show_payments, set_show_payments] = useState(false);
  return (
    <>
      <div className="payment-table-row">
        <span className="payment-table-item date-col">
          {new Date(s.creation_datetime).toLocaleDateString("fa-ir")}
        </span>
        <span className="payment-table-item  prod-count-col samll-font">
          {all_users ? user.fullname : <LittleLoading />}
        </span>
        <span className="payment-table-item phone-number-col samll-font">
          {s.buyer_phone_number}
        </span>
        <span className="payment-table-item price-col">
          {split_in_three(convert_to_persian(s.sale_final_price))} تومان
        </span>
        <span className="payment-table-item">
          {show_prods && prods ? (
            prods.map((p) => (
              <span key={p.product_id} className="prod-item">
                {p.product_title}
              </span>
            ))
          ) : (
            <></>
          )}
          <button
            onClick={() => {
              set_show_prods(!show_prods);
            }}
            className={show_prods ? "show-prod-btn shown" : "show-prod-btn"}
          >
            {!show_prods ? "نمایش محصولات" : "بستن"}
          </button>
        </span>

        <span className="payment-table-item share-col">
          <button
            onClick={() => {
              set_show_payments(!show_payments);
            }}
            className={show_payments ? "show-prod-btn shown" : "show-prod-btn"}
          >
            {!show_payments ? "مشاهده پرداختی ها" : "بستن پرداختی ها"}
          </button>
        </span>
      </div>
      {show_payments ? (
        s.payments.map((p) => (
          <Payment
            sales={sales}
            set_sales={set_sales}
            key={p.payment_id}
            p={p}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default Sale;
