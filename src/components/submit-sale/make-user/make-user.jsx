import React, { useContext, useState } from "react";
import LittleLoading from "../../reuseables/little-loading";
import { DataContext } from "../../data/datacontext";

import arrow from "../../../asset/images/make-lead/arrow-up.svg";
import axios from "axios";
import urls from "../../../urls/url";

const MakeUser = ({ set_selected_user }) => {
  const { subjects, years } = useContext(DataContext);
  const [open_select, set_open_select] = useState(false);
  const [name, set_name] = useState(false);
  const [name_err, set_name_err] = useState(false);
  const [phone, set_phone] = useState(false);
  const [phone_err, set_phone_err] = useState(false);
  const [pass, set_pass] = useState(false);
  const [pass_err, set_pass_err] = useState(false);
  const [subject, set_subject] = useState(false);
  const [grade, set_grade] = useState(false);
  const [pause, set_pause] = useState(false);
  const [disable_part, set_disable_part] = useState(false);
  const handle_open_select = (entry) => {
    if (entry === open_select) {
      set_open_select(false);
    } else {
      set_open_select(entry);
    }
  };
  const handle_name = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_name(false);
      set_name_err("نام وارد شده کوتاه است");
    } else {
      set_name(value);
      set_name_err(false);
    }
  };
  const handle_phone = (e) => {
    const value = e.target.value;
    if (!value.startsWith("09")) {
      set_phone(false);
      set_phone_err("شماره موبایل باید با ۰۹ شروع  شود");
    } else if (value.length !== 11) {
      set_phone(false);
      set_phone_err("شماره موبایل باید ۱۱ رقم باشد");
    } else {
      set_phone(value);
      set_phone_err(false);
    }
  };
  const handle_pass = (e) => {
    const value = e.target.value;
    if (value.length < 8) {
      set_pass(false);
      set_pass_err("پسورد حداقل باید ۸ رقم باشد");
    } else {
      set_pass(value);
      set_pass_err(false);
    }
  };
  const make_user = () => {
    if (name && phone && subject && grade) {
      const send_obj = {
        phone_number: phone,
        name: name,
        grade: grade.name,
        major: subject.name,
      };
      set_pause(true);
      axios
        .post(urls.submit_user, send_obj)
        .then((res) => {
          set_pause(false);
          const { result, response, error } = res.data;
          if (result) {
            console.log(response);
            set_selected_user(response);
            set_disable_part(true);
          } else {
            alert("مشکلی پیش آمده");
            console.log(error);
          }
        })
        .catch((e) => {
          alert("مشکلی پیش آمده");
          console.log(e.messsage);
          set_pause(false);
        });
      console.log(send_obj);
    } else {
      alert("تمامی اطلاعات مورد نیاز وارد نشده یا موردی ایراد دارد");
    }
  };
  return (
    <section
      className={
        disable_part
          ? "make-user-section box-style disabled-part"
          : "make-user-section box-style"
      }
    >
      <div className="section-header">
        <span className="header-title">اطلاعات کاربری</span>
      </div>
      <div className="inputs-part">
        <div className="right-inputs input-cols">
          <div className="input-wrapper">
            <span className="input-label">نام و نام خانوادگی</span>
            <span className="input-span">
              <input
                type="text"
                placeholder="نام را وارد کنید"
                onInput={handle_name}
              />
            </span>
          </div>
          <div className="input-wrapper">
            <span className="input-label">شماره موبایل</span>
            <span className="input-span">
              <input
                type="number"
                placeholder="شماره موبایل را وارد کنید"
                onInput={handle_phone}
              />
            </span>
          </div>
          {/* <div className="input-wrapper">
            <span className="input-label">رمز عبور</span>
            <span className="input-span">
              <input
                type="text"
                placeholder="رمزی برای کاربر انتخاب کنید"
                onInput={handle_pass}
              />
              <span className="optional-text">اختیاری</span>
            </span>
          </div> */}
        </div>
        <div className="left-inputs input-cols">
          <div className="input-wrapper">
            <span className="input-label">رشته</span>
            <span className="input-span">
              <span
                className="custom-select-box"
                onClick={() => {
                  handle_open_select("major");
                }}
              >
                <span className="custom-select-box-text">
                  {subject ? subject.name : "انتخاب کنید"}
                </span>
                <img src={arrow} alt="بازکردن" />
              </span>
              {open_select === "major" ? (
                <span className="select-box-options">
                  {subjects ? (
                    subjects.map((s) => (
                      <span
                        key={s.id}
                        className="select-option"
                        onClick={() => {
                          set_subject(s);
                          handle_open_select(false);
                        }}
                      >
                        {s.name}
                      </span>
                    ))
                  ) : (
                    <LittleLoading />
                  )}
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>
          <div className="input-wrapper">
            <span className="input-label">پایه</span>
            <span className="input-span">
              <span
                className="custom-select-box"
                onClick={() => {
                  handle_open_select("grade");
                }}
              >
                <span className="custom-select-box-text">
                  {grade ? grade.name : "انتخاب کنید"}
                </span>
                <img src={arrow} alt="بازکردن" />
              </span>
              {open_select === "grade" ? (
                <span className="select-box-options">
                  {years ? (
                    years.map((s) => (
                      <span
                        key={s.id}
                        className="select-option"
                        onClick={() => {
                          handle_open_select(false);
                          set_grade(s);
                        }}
                      >
                        {s.name}
                      </span>
                    ))
                  ) : (
                    <LittleLoading />
                  )}
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="submit-btn-wrapper">
        {pause ? (
          <button className="submit-btn">
            <LittleLoading />
          </button>
        ) : (
          <button className="submit-btn" onClick={make_user}>
            ساخت کاربر
          </button>
        )}
      </div>
    </section>
  );
};

export default MakeUser;
