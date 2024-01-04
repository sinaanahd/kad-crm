import React, { useContext, useState } from "react";
import convert_to_persian from "../../functions/convert-to-persian";
import LittleLoading from "../../reuseables/little-loading";
import split_in_three from "../../functions/spilit_in_three";
import { DataContext } from "../../data/datacontext";

const PaymentRow = ({ payment }) => {
  const { products, all_users } = useContext(DataContext);
  const [show_prods, set_show_prods] = useState(false);
  const sina = {
    deadline_datetime: "2023-12-12T00:00:00+03:30",
    image: "https://kadschool.com/media/PaymentsFishImages/1181.webp",
    is_beyane: false,
    is_ghest: true,
    manager_confirmation: true,
    pay_ref_id: null,
    paying_datetime: "2023-12-13T16:08:08.446382+03:30",
    payment_amount: 1451000,
    payment_creation_datetime: "2023-12-12T18:22:24.221754+03:30",
    payment_id: 1181,
    products_ids: (2)[(23, 40)],
    status: "پرداخت شده",
  };
  const prods = products
    ? products.filter((p) => payment.products_ids.includes(p.product_id))
    : false;
  const payment_user = all_users
    ? all_users.find((u) => u.phone_number === payment.phone)
    : false;
  return (
    <>
      <div className="payment-table-row ">
        {payment.manager_confirmation ? (
          <></>
        ) : (
          <span className="manager-label">تایید نشده</span>
        )}

        <span className="payment-table-item date-col">
          {new Date(payment.paying_datetime).toLocaleDateString("fa-ir")}
        </span>
        <span className="payment-table-item  prod-count-col samll-font">
          {payment_user ? payment_user.fullname : <LittleLoading />}
        </span>
        <span className="payment-table-item phone-number-col samll-font">
          {payment.phone}
        </span>
        <span className="payment-table-item">
          {show_prods ? (
            <>
              {prods ? (
                prods.map((p) => (
                  <span key={p.product_id} className="prod-item">
                    {p.product_title}
                  </span>
                ))
              ) : (
                <LittleLoading />
              )}
            </>
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
        <span className="payment-table-item price-col">
          {split_in_three(convert_to_persian(payment.payment_amount))} تومان
        </span>
        <span className="payment-table-item share-col">
          {split_in_three(
            convert_to_persian(
              Math.ceil(payment.payment_amount * payment.pourcant)
            )
          )}{" "}
          تومان
        </span>
      </div>
    </>
  );
};

export default PaymentRow;
