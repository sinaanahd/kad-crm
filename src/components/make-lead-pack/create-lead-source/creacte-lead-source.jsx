import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import axios from "axios";
import urls from "../../../urls/url";
import LittleLoading from "../../reuseables/little-loading";
const CreateLeadSource = ({ set_pop_up }) => {
  const { out_side_lead_soursce_setter } = useContext(DataContext);
  const [title, set_title] = useState(false);
  const [title_public, set_title_public] = useState(false);
  const [pause, set_pause] = useState(false);
  const send_new_lead_source = () => {
    if (title && title_public) {
      set_pause(true);
      const send_obj = {
        title: title,
        public_title: title_public,
      };
      axios
        .post(urls.lead_sources, send_obj)
        .then((res) => {
          console.log(res.data);
          const { error, response, result } = res.data;
          if (result) {
            out_side_lead_soursce_setter(response);
            set_pop_up(false);
            alert("لید سورس با موفقیت ساخته شد");
            set_pause(false);
          } else {
            alert("مشکلی پیش آمده");
            console.log(error);
            set_pause(false);
          }
        })
        .catch((e) => {
          console.log(e.message);
          set_pause(false);
        });
    } else {
      alert("اطلاعات را به درستی وارد کنید");
    }
  };
  const handle_title = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      set_title(value);
    } else {
      set_title(false);
    }
  };
  const handle_title_public = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      set_title_public(value);
    } else {
      set_title_public(false);
    }
  };
  return (
    <>
      <span className="make-title">ساخت لید سورس</span>
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
          <span className="pop-input-title">عنوان عمومی</span>
          <input
            type="text"
            placeholder="عنوان عمومی را وارد کنید"
            onInput={handle_title_public}
          />
        </span>
      </div>
      {pause ? (
        <span className="pop-up-make-btn">
          <LittleLoading />
        </span>
      ) : (
        <span className="pop-up-make-btn" onClick={send_new_lead_source}>
          ساخت لید سورس
        </span>
      )}
    </>
  );
};

export default CreateLeadSource;
