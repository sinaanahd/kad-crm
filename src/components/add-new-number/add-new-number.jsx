import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import { DataContext } from "../data/datacontext";
import urls from "../../urls/url";
import axios from "axios";
const Add_new_number = () => {
  const { user } = useContext(DataContext);
  const [pause, set_pause] = useState(false);
  const [phone_number, set_phone_number] = useState(false);
  const [phone_number_err, set_phone_number_err] = useState(false);
  const handle_phone_number = (e) => {
    const value = e.target.value;
    if (!value.startsWith("09")) {
      set_phone_number(false);
      set_phone_number_err("شماره باید با 09 شروع شود");
    } else if (value.length !== 11) {
      set_phone_number(false);
      set_phone_number_err("شماره باید ۱۱ رقم باشد");
    } else {
      set_phone_number(value);
      set_phone_number_err(false);
    }
  };
  const send_data = () => {
    if (phone_number) {
      set_pause(true);
      const send_obj = {
        phone_number: phone_number,
        staff_id: user.id,
      };
      console.log(send_obj);
      axios
        .post(urls.set_single_lead_in_default_leadpack, send_obj)
        .then((res) => {
          const { result, response, error } = res.data;
          console.log(res.data);
          if (result) {
            // console.log(response);
            alert("شماره با موفقیت ذخیره شد");
            // window.location.reload();
            window.location.pathname = `/lead/${response}`;
          } else {
            alert("مشکلی پیش آمده");
            console.log(error);
          }
          set_pause(false);
        })
        .catch((e) => {
          console.log(e.message);
          alert("مشکلی پیش آمده");
          set_pause(false);
        });
    } else {
      alert("اطلاعات به درستی وارد نشده");
    }
  };
  return (
    <>
      <Helmet>
        <title>اضافه کردن شماره جدید</title>
      </Helmet>
      <section className="add-new-number-page mm-width">
        <div className="section-header">
          <h1 className="page-title">اضافه کردن شماره جدید</h1>
        </div>
        <div className="input-wrapper">
          <span className="input-label">شماره : </span>
          <span className="input-span">
            <input
              type="number"
              placeholder="شماره را وارد کنید"
              onInput={handle_phone_number}
            />
            <span className="error-label">
              {phone_number_err ? phone_number_err : ""}
            </span>
          </span>
          <span className="button-wrapper">
            {pause ? (
              <button className="submit-number">
                <LittleLoading />
              </button>
            ) : (
              <button className="submit-number" onClick={send_data}>
                ثبت شماره
              </button>
            )}
          </span>
        </div>
      </section>
    </>
  );
};

export default Add_new_number;
