import React, { useContext, useState } from "react";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
import Product from "./product/product";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
const DateRow = ({ date }) => {
  const { products, call_results } = useContext(DataContext);
  const [show_call_results, set_show_call_results] = useState(false);
  const [show_prods, set_show_prods] = useState(false);
  const fill_products = () => {
    let all_products = [];
    date.date_payments.forEach((p) => {
      const found_in_payment = products.filter((prod) =>
        p.products_ids.includes(prod.product_id)
      );
      if (found_in_payment.length !== 0) {
        all_products = all_products.concat(found_in_payment);
      }
    });
    return all_products;
  };
  const date_products = products ? fill_products() : false;
  const total_price = () => {
    let sum = 0;
    date.date_payments.forEach((p) => {
      sum += p.payment_amount;
    });
    return sum;
  };
  const find_call_result = (id) => {
    const call_result = call_results.find((cr) => cr.id === id);
    return call_result ? call_result.callresult_text : "مورد پیدا نشد";
  };
  return (
    <>
      <div className="table-row">
        <span
          className={
            date.date_calls.length !== 0 ? "data-label passed" : "data-label"
          }
        >
          تماس
        </span>
        <span
          className={
            date.date_payments.length !== 0
              ? "sale-label data-label passed"
              : "sale-label data-label"
          }
        >
          فروش
        </span>
        <span className="table-item day-col">{date.day_week}</span>
        <span className="table-item date-col">{date.perisan_date}</span>
        <span
          className="table-item call-count-col"
          onClick={() => {
            set_show_call_results(!show_call_results);
          }}
        >
          {date.date_calls.length !== 0
            ? `${convert_to_persian(date.date_calls.length)} تماس`
            : "بدون تماس"}
        </span>
        <span className="table-item sold-prod-count-col">
          {date.date_payments.length !== 0
            ? `${convert_to_persian(date.date_payments.length)} محصول`
            : "بدون فروش"}
        </span>
        <span className="table-item">
          {date_products ? (
            date_products.length === 0 ? (
              "محصولی فروخته نشده است"
            ) : (
              <>
                {show_prods ? (
                  date_products.map((product) => (
                    <Product key={product.product_id} prod={product} />
                  ))
                ) : (
                  <></>
                )}
                <button
                  className={show_prods ? "show-pords close" : "show-pords"}
                  onClick={() => {
                    set_show_prods(!show_prods);
                  }}
                >
                  {show_prods ? "بستن" : "مشاهده محصولات"}
                </button>
              </>
            )
          ) : (
            <LittleLoading />
          )}
        </span>
        <span className="table-item price-col">
          {split_in_three(convert_to_persian(total_price()))} تومان
        </span>
      </div>
      {show_call_results && date.date_calls.length !== 0 ? (
        <div className="call-texts">
          {date.date_calls.map((c, i) => (
            <div className="call-text" key={i++}>
              {call_results ? (
                find_call_result(c.callresult_id)
              ) : (
                <LittleLoading />
              )}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DateRow;
