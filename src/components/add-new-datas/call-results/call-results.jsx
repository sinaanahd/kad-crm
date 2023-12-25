import React, { useContext, useRef, useState } from "react";
import LittleLoading from "../../reuseables/little-loading";
import { DataContext } from "../../data/datacontext";
import axios from "axios";
import urls from "../../../urls/url";
import ReloadBtn from "../../reuseables/reload-btn";
const CallResults = () => {
  const {
    call_results,
    out_side_call_results_setter,
    get_call_results,
    set_call_results,
  } = useContext(DataContext);
  const input_ref = useRef(false);
  const [title, set_title] = useState(false);
  const [pause, set_pause] = useState(false);
  const handle_title = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      set_title(value);
    } else {
      set_title(false);
    }
  };
  const send_new_call_result = () => {
    if (title) {
      const send_obj = { callresult_text: title };
      set_pause(true);
      axios
        .post(urls.call_result, send_obj)
        .then((res) => {
          const { error, response, result } = res.data;
          console.log(res.data);
          set_pause(false);
          if (result) {
            out_side_call_results_setter(response);
            input_ref.current.value = "";
          } else {
            alert("مشکلی در ساخت نتیجه تماس بوجود آمده");
            console.log(error);
          }
        })
        .catch((e) => {
          console.log(e.message);
          set_pause(false);
        });
    } else {
      alert("اطلاعات وارد نشده است");
    }
  };
  const handle_reload = () => {
    set_call_results(false);
    get_call_results();
  };
  return (
    <section className="lead-packs-box box-style">
      <div className="box-header">
        <span className="box-title">تمامی پاسخ تماس ها</span>
        <ReloadBtn click={handle_reload} />
      </div>
      <div className="make-new-call-result">
        <span className="input-label">ساخت یک پاسخ تماس جدید : </span>
        <input
          type="text"
          className="make-new-call-result-wrapper"
          placeholder="جواب جدید را وارد کنید"
          onInput={handle_title}
          ref={input_ref}
        />
        {pause ? (
          <button className="submit-new-call-result">
            <LittleLoading />
          </button>
        ) : (
          <button
            className="submit-new-call-result"
            onClick={send_new_call_result}
          >
            ثبت
          </button>
        )}
      </div>
      <div className="all-call-results all-wrapper">
        {call_results ? (
          call_results.map((cr) => (
            <div key={cr.id} className="call-result">
              {cr.callresult_text}
            </div>
          ))
        ) : (
          <LittleLoading />
        )}
      </div>
    </section>
  );
};

export default CallResults;
