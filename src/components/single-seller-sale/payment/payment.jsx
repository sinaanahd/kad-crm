import React, { useState } from "react";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import axios from "axios";
import urls from "../../../urls/url";
import LittleLoading from "../../reuseables/little-loading";
const Payment = ({ p, sales, set_sales }) => {
  const [show_img, set_show_img] = useState(false);
  const [file, set_file] = useState(false);
  const [payment_id, set_payment_id] = useState(false);
  const [pause, set_pause] = useState(false);
  const [img, set_img] = useState(false);
  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      //   console.log(file);
      set_file(file);
      set_payment_id(id);
    }
  };
  const handle_img = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        set_img(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
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
            console.log(response);
            modify_sales(response);
          } else {
            alert("مشکلی پیش آمده");
            console.log(error);
          }
        })
        .catch((e) => {
          set_pause(false);
          console.log(e);
          alert("مشکلی پیش آمده");
        });
    } else {
      alert("فیش واریزی وارد نشده است");
    }
  };
  const modify_sales = (sale) => {
    const old_sales = [...sales];
    const index = old_sales.findIndex((s) => s.sale_id === sale.sale_id);
    old_sales.splice(index, 1, sale);
    set_sales(old_sales);
    set_file(false);
    set_img(false);
    set_show_img(false);
  };
  return (
    <>
      <div className="all-sale-payments-wrapper">
        <span className="sale-payment-item">
          <span className="sale-payment-item-title">نوع پرداخت</span>
          <span className="sale-payment-item-content">
            {p.is_beyane ? "بیعانه" : p.is_ghest ? "قسطی" : "نقدی"}
          </span>
        </span>
        <span className="sale-payment-item">
          <span className="sale-payment-item-title">میزان پرداختی</span>
          <span className="sale-payment-item-content">
            {p.payment_amount
              ? split_in_three(convert_to_persian(p.payment_amount))
              : "-"}{" "}
            تومان
          </span>
        </span>
        <span className="sale-payment-item">
          <span className="sale-payment-item-title">تاریخ پرداخت</span>
          <span className="sale-payment-item-content">
            {p.paying_datetime
              ? new Date(p.paying_datetime).toLocaleDateString("fa-ir")
              : "وارد نشده"}
          </span>
        </span>
        <span className="sale-payment-item">
          <span className="sale-payment-item-title">موعد پرداخت</span>
          <span className="sale-payment-item-content">
            {new Date(p.deadline_datetime).toLocaleDateString("fa-ir")}
          </span>
        </span>
        <span className="sale-payment-item">
          <span className="sale-payment-item-title">فیش واریزی</span>
          <button
            className="show-payment-img"
            onClick={() => {
              set_show_img(!show_img);
            }}
          >
            {show_img ? "عدم نمایش" : "نمایش فیش"}
          </button>
        </span>
      </div>
      {show_img ? (
        <div className="payment-imgs-wrapper">
          <div className="old-img-wrapper">
            <span className="old-image-title">عکس وارد شده : </span>
            {p.image ? (
              <img
                src={p.image}
                onClick={() => {
                  window.open(p.image);
                }}
              />
            ) : (
              "عکسی وارد نشده"
            )}
          </div>
          <div className="old-img-wrapper">
            <span className="old-image-title">بازگذاری جدید : </span>
            <label htmlFor="upload-payment-img" className="choose-file-btn">
              انتخاب فایل
            </label>
            <input
              type="file"
              name="upload-payment-img"
              id="upload-payment-img"
              accept=".png ,.jpg ,.jpeg , .webp"
              onChange={(e) => {
                handleFileChange(e, p.payment_id);
                handle_img(e);
              }}
            />
            {img ? (
              <img
                src={img}
                onClick={() => {
                  window.open(file);
                }}
              />
            ) : (
              <></>
            )}
            {file ? file.name : <></>}
            {file ? (
              pause ? (
                <button className="send-img-btn">
                  <LittleLoading />
                </button>
              ) : (
                <button
                  className="send-img-btn"
                  onClick={() => {
                    send_fish_img();
                  }}
                >
                  ثبت فیش
                </button>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Payment;
