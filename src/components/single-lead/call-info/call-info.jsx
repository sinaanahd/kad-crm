import React, { useContext, useRef, useState } from "react";
import LittleLoading from "../../reuseables/little-loading";
import { DataContext } from "../../data/datacontext";
import convert_to_persian from "../../functions/convert-to-persian";
import axios from "axios";
import urls from "../../../urls/url";
const CallInfo = ({ lead, set_lead }) => {
  const { call_results } = useContext(DataContext);
  const [call_result, set_call_result] = useState(false);
  const [note, set_note] = useState(false);
  const [show_results, set_show_results] = useState(false);
  const [pause, set_pause] = useState(false);

  const textare_ref = useRef(false);
  const handle_call_result = (result) => {
    set_call_result(result);
    set_show_results(false);
  };
  const handle_note = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      set_note(value);
    } else {
      set_note(false);
    }
  };
  const send_call = () => {
    if (call_result) {
      set_pause(true);
      set_note(false);
      set_show_results(false);
      set_call_result(false);
      textare_ref.current.value = "";
      const crm_user = JSON.parse(localStorage.getItem("crm-user"));
      const send_obj = {
        phone_number: lead.phone_number,
        staff_id: crm_user.id,
        callResult_id: call_result.id,
        note: note ? note : null,
      };
      // console.log(send_obj);
      axios
        .post(urls.call, send_obj)
        .then((res) => {
          set_pause(false);
          console.log(res.data);
          const { error, response, result } = res.data;
          if (result) {
            set_lead(response);
          } else {
            console.log(error);
            alert("مشکلی پیش آمده");
          }
        })
        .catch((e) => {
          console.log(e.message);
          set_pause(false);
        });
    } else {
      alert("لطفا تمامی فیلد ها را پر کنید");
    }
  };
  return (
    <section className="call-history">
      <div className="box-header">
        <span className="box-title">اطلاعات تماس</span>
      </div>
      <div className="call-count">
        <span className="call-count-title">تعداد تماس</span>
        <span className="call-count-value">
          {lead ? convert_to_persian(lead.calls.length) : <LittleLoading />}
        </span>
      </div>
      <div className="call-results">
        <div className="call-result">
          <span className="date-select-box-wrapper">
            <span className="call-date"> وضعیت تماس</span>
            <span className="call-input-wrapper">
              <span
                className="select-input"
                onClick={() => {
                  set_show_results(!show_results);
                }}
              >
                {call_result ? call_result.callresult_text : "انتخاب وضعیت"}
              </span>
              {show_results ? (
                <span className="call-results-options">
                  {call_results.map((cr) => (
                    <span
                      key={cr.id}
                      className="call-result-option"
                      onClick={() => {
                        handle_call_result(cr);
                      }}
                    >
                      {cr.callresult_text}
                    </span>
                  ))}
                </span>
              ) : (
                <></>
              )}
            </span>
          </span>
          <span className="call-inputs-or-result">
            <span className="call-note-title">یادداشت</span>
            <span className="text-area-part">
              <textarea
                onInput={handle_note}
                name="note-1"
                id="note-1"
                placeholder="نوشتن یادداشت"
                ref={textare_ref}
              ></textarea>
            </span>
          </span>
          {pause ? (
            <button className="submit-call-result-data-btn">
              <LittleLoading />
            </button>
          ) : (
            <button className="submit-call-result-data-btn" onClick={send_call}>
              ثبت نتیجه تماس
            </button>
          )}
        </div>

        {lead ? (
          lead.calls.map((c, i) => (
            <React.Fragment key={i++}>
              <div className="call-title"> نتیجه تماس</div>
              <div className="call-result">
                <span className="date-select-box-wrapper">
                  <span className="call-date">
                    {new Date(c.call_datetime).toLocaleDateString("fa-ir")}
                  </span>
                  <span className="call-input-wrapper">
                    <span className="select-input">
                      {call_results ? (
                        call_results.find((cr) => cr.id === c.callresult_id)
                          .callresult_text
                      ) : (
                        <LittleLoading />
                      )}
                    </span>
                  </span>
                </span>
                <span className="call-inputs-or-result">
                  <span className="call-note-title">یادداشت</span>
                  <span className="text-area-part">
                    <p className="note-result">
                      {c.call_note ? c.call_note : "یادداشتی وارد نشده !"}
                    </p>
                  </span>
                </span>
              </div>
            </React.Fragment>
          ))
        ) : (
          <LittleLoading />
        )}
      </div>
    </section>
  );
};

export default CallInfo;

// <div className="call-result">
//   <span className="date-select-box-wrapper">
//     <span className="call-date">۱۳ آبان ۱۴۰۲</span>
//     <span className="call-input-wrapper">
//       <span className="select-input">انتخاب وضعیت</span>
//     </span>
//   </span>
//   <span className="call-inputs-or-result">
//     <span className="call-note-title">یادداشت</span>
//     <span className="text-area-part">
//       {/* <textarea
//                 name="note-1"
//                 id="note-1"
//                 placeholder="نوشتن یادداشت"
//               ></textarea> */}
//       <p className="note-result">
//         یادم باشه درباره میزان تخفیف برای کلاس فسلفه و منطق سوالات
//         بیشتری بکنم
//         <br />
//         در ضمن هنوز دو دل به خرید برای ۳ تا دوره همزمان هست
//       </p>
//     </span>
//   </span>
// </div>
// <div className="call-result">
//   <span className="date-select-box-wrapper">
//     <span className="call-date">۱۳ آبان ۱۴۰۲</span>
//     <span className="call-input-wrapper">
//       <span className="select-input">انتخاب وضعیت</span>
//     </span>
//   </span>
//   <span className="call-inputs-or-result">
//     <span className="call-note-title">یادداشت</span>
//     <span className="text-area-part">
//       {/* <textarea
//                 name="note-1"
//                 id="note-1"
//                 placeholder="نوشتن یادداشت"
//               ></textarea> */}
//       <p className="note-result">
//         یادم باشه درباره میزان تخفیف برای کلاس فسلفه و منطق سوالات
//         بیشتری بکنم
//         <br />
//         در ضمن هنوز دو دل به خرید برای ۳ تا دوره همزمان هست
//       </p>
//     </span>
//   </span>
// </div>
// <div className="call-result">
//   <span className="date-select-box-wrapper">
//     <span className="call-date">۱۳ آبان ۱۴۰۲</span>
//     <span className="call-input-wrapper">
//       <span className="select-input">انتخاب وضعیت</span>
//     </span>
//   </span>
//   <span className="call-inputs-or-result">
//     <span className="call-note-title">یادداشت</span>
//     <span className="text-area-part">
//       {/* <textarea
//                 name="note-1"
//                 id="note-1"
//                 placeholder="نوشتن یادداشت"
//               ></textarea> */}
//       <p className="note-result">
//         یادم باشه درباره میزان تخفیف برای کلاس فسلفه و منطق سوالات
//         بیشتری بکنم
//         <br />
//         در ضمن هنوز دو دل به خرید برای ۳ تا دوره همزمان هست
//       </p>
//     </span>
//   </span>
// </div>
