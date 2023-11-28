import React, { useContext, useState } from "react";
import urls from "../../../urls/url";
import LittleLoading from "../../reuseables/little-loading";
import axios from "axios";
import { DataContext } from "../../data/datacontext";
const CreateFormular = ({ set_pop_up }) => {
  const { out_side_formular_setter } = useContext(DataContext);
  // const [title, set_title] = useState(false);
  const [naghd, set_naghd] = useState(false);
  const [ghest, set_ghest] = useState(false);
  const [pause, set_pause] = useState(false);
  // const handle_title = (e) => {
  //   const value = e.target.value;
  //   if (value.length !== 0) {
  //     set_title(value);
  //   } else {
  //     set_title(false);
  //   }
  // };
  const handle_naghd = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      set_naghd(value);
    } else {
      set_naghd(false);
    }
  };
  const handle_ghest = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      set_ghest(value);
    } else {
      set_ghest(false);
    }
  };
  const send_new_formular = () => {
    if (naghd && ghest) {
      set_pause(true);
      const send_obj = {
        ghesti_percent: ghest,
        naghdi_percent: naghd,
      };
      axios
        .post(urls.formular, send_obj)
        .then((res) => {
          console.log(res.data);
          const { error, response, result } = res.data;
          if (result) {
            out_side_formular_setter(response);
            set_pop_up(false);
            alert("فرمول جدید با موفقیت اضافه شد");
          } else {
            console.log(error);
            alert("مشکلی پیش آمده !");
          }
          set_pause(false);
        })
        .catch((e) => {
          console.log(e.message);
          set_pause(false);
        });
    } else {
      alert("اطلاعات را به درستی وارد کنید");
    }
  };
  return (
    <>
      <span className="make-title">ساخت فرمول پورسانت</span>
      <div className="pop-options">
        {/* <span className="pop-up-input-wrapper">
          <span className="pop-input-title">عنوان</span>
          <input
            type="text"
            placeholder="عنوان را وارد کنید"
            onInput={handle_title}
          />
        </span> */}
        <span className="pop-up-input-wrapper">
          <span className="pop-input-title">درصد نقدی</span>
          <input
            type="number"
            placeholder="درصد نقدی را وارد کنید"
            onInput={handle_naghd}
          />
        </span>
        <span className="pop-up-input-wrapper">
          <span className="pop-input-title">درصد قسطی</span>
          <input
            type="number"
            placeholder="درصد قسطی را وارد کنید"
            onInput={handle_ghest}
          />
        </span>
      </div>
      {pause ? (
        <span className="pop-up-make-btn">
          <LittleLoading />
        </span>
      ) : (
        <span className="pop-up-make-btn" onClick={send_new_formular}>
          ساخت فرمول پورسانت
        </span>
      )}
    </>
  );
};

export default CreateFormular;
