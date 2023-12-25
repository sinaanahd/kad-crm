import React, { useEffect, useState } from "react";
import LittleLoading from "../../reuseables/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
import axios from "axios";
import urls from "../../../urls/url";
import Payment from "./payment/payment";

const PaymentsData = ({ sale, set_is_final, set_sale }) => {
  const [file, set_file] = useState(false);
  const [payment_id, set_payment_id] = useState(false);
  const [pause, set_pause] = useState(false);
  const [disable_part, set_disable_part] = useState(false);

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      set_file(file);
      set_payment_id(id);
    }
  };
  useEffect(() => {});
  const send_fish_img = () => {
    if (file && payment_id) {
      const send_obj = new FormData();
      send_obj.append("payment_id", payment_id);
      send_obj.append("image", file);
      set_pause(true);
      axios
        .post(urls.payment_fish_image, send_obj)
        .then((res) => {
          set_pause(false);
          const { result, response, error } = res.data;
          if (result) {
            set_sale(response);
            set_is_final(true);
            set_disable_part(true);
          } else {
            alert("مشکلی پیش آمده");
            console.log(error);
          }
        })
        .catch((e) => {
          set_pause(false);
          console.log(e.message);
          alert("مشکلی پیش آمده");
        });
    } else {
      alert("فیش واریزی وارد نشده است");
    }
  };
  return (
    <section
      className={
        disable_part
          ? "payments-data-wrapper box-style disabled-part"
          : "payments-data-wrapper box-style"
      }
    >
      <div className="section-header">
        <span className="header-title">پرداخت ها</span>
      </div>
      <div className="payments-table">
        <div className="payment-row payment-header">
          <span className="payment-item pay-item-header">تاریخ</span>
          <span className="payment-item pay-item-header">مبلغ</span>
          <span className="payment-item pay-item-header">نوع پرداخت</span>
          <span className="payment-item pay-item-header">درصد تخفیف</span>
          <span className="payment-item pay-item-header flex-width-100">
            فیش واریزی
          </span>
          <span className="payment-item pay-item-header btn-col"></span>
        </div>
        {sale ? (
          sale.payments.map((pp, i) => (
            <Payment
              sale={sale}
              payment={pp}
              count={i}
              key={pp.payment_id}
              handleFileChange={handleFileChange}
              file={file}
            />
          ))
        ) : (
          // <Payment
          //   sale={false}
          //   payment={false}
          //   count={0}
          //   key={false}
          //   handleFileChange={handleFileChange}
          //   file={file}
          // />
          <LittleLoading />
        )}
      </div>
      <div className="final-payments-price">
        <div className="final-payment-price-label-wrapper">
          <span className="final-payment-price-label">مبلغ کل : </span>
          <span className="final-payment-price-num">
            {sale ? (
              split_in_three(convert_to_persian(sale.sale_final_price))
            ) : (
              <LittleLoading />
            )}{" "}
            تومان
          </span>
        </div>
        {pause ? (
          <button className="final-submit-btn">
            <LittleLoading />
          </button>
        ) : (
          <button className="final-submit-btn" onClick={send_fish_img}>
            ثبت نهایی
          </button>
        )}
      </div>
    </section>
  );
};

export default PaymentsData;
