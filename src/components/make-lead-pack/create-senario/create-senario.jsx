import React, { useState, useContext } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
import axios from "axios";
import urls from "../../../urls/url";
const CreateSenario = ({ set_pop_up }) => {
  const { out_side_senario_setter } = useContext(DataContext);
  const [title, set_title] = useState(false);
  const [text, set_text] = useState(false);
  const [pause, set_pause] = useState(false);
  const handle_title = (e) => {
    if (e.target.value.length !== 0) {
      set_title(e.target.value);
    } else {
      set_title(false);
    }
  };
  const handle_text = (e) => {
    if (e.target.value.length !== 0) {
      set_text(e.target.value);
    } else {
      set_text(false);
    }
  };
  const submit_senario = () => {
    if (title && text) {
      set_pause(true);
      const send_obj = {
        scenario_name: title,
        scenario_text: text,
      };
      axios
        .post(urls.senarios, send_obj)
        .then((res) => {
          set_pause(false);
          const { error, response, result } = res.data;
          if (result) {
            out_side_senario_setter(response);
            set_pop_up(false);
            alert("سناریو با موفقیت ایجاد شد");
          } else {
            console.log(error);
            alert("مشکلی پیش آمده لطفا دوباره تلاش کنید");
          }
          console.log(res.data);
        })
        .catch((e) => {
          set_pause(false);
          console.log(e);
        });
    } else {
      alert("اطلاعات را کامل وارد کنید");
    }
  };
  return (
    <>
      <span className="make-title">ساخت سناریو تماس</span>
      <div className="pop-options">
        <span className="pop-up-input-wrapper">
          <span className="pop-input-title">عنوان</span>
          <input
            type="text"
            placeholder="عنوان را وارد کنید"
            onInput={handle_title}
          />
        </span>
        <span className="pop-up-input-wrapper">
          <span className="pop-input-title">متن سناریو</span>
          <textarea
            placeholder="عنوان عمومی را وارد کنید"
            onInput={handle_text}
          />
        </span>
      </div>
      {pause ? (
        <span className="pop-up-make-btn">
          <LittleLoading />
        </span>
      ) : (
        <span className="pop-up-make-btn" onClick={submit_senario}>
          ساخت سناریو تماس
        </span>
      )}
    </>
  );
};

export default CreateSenario;
