import React, { useContext, useState } from "react";
import LittleLoading from "../../reuseables/little-loading";
import { DataContext } from "../../data/datacontext";

import arrow from "../../../asset/images/make-lead/arrow-up.svg";

const MakeUser = () => {
  const { subjects, years } = useContext(DataContext);
  const [open_select, set_open_select] = useState(false);
  const handle_open_select = (entry) => {
    if (entry === open_select) {
      set_open_select(false);
    } else {
      set_open_select(entry);
    }
  };
  return (
    <section className="make-user-section box-style">
      <div className="section-header">
        <span className="header-title">اطلاعات کاربری</span>
      </div>
      <div className="inputs-part">
        <div className="right-inputs input-cols">
          <div className="input-wrapper">
            <span className="input-label">نام و نام خانوادگی</span>
            <span className="input-span">
              <input type="text" placeholder="نام را وارد کنید" />
            </span>
          </div>
          <div className="input-wrapper">
            <span className="input-label">شماره موبایل</span>
            <span className="input-span">
              <input type="number" placeholder="شماره موبایل را وارد کنید" />
            </span>
          </div>
          <div className="input-wrapper">
            <span className="input-label">رمز عبور</span>
            <span className="input-span">
              <input type="text" placeholder="رمزی برای کاربر انتخاب کنید" />
              <span className="optional-text">اختیاری</span>
            </span>
          </div>
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
                <span className="custom-select-box-text">انتخاب کنید</span>
                <img src={arrow} alt="بازکردن" />
              </span>
              {open_select === "major" ? (
                <span className="select-box-options">
                  {subjects ? (
                    subjects.map((s) => (
                      <span key={s.id} className="select-option">
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
                <span className="custom-select-box-text">انتخاب کنید</span>
                <img src={arrow} alt="بازکردن" />
              </span>
              {open_select === "grade" ? (
                <span className="select-box-options">
                  {years ? (
                    years.map((s) => (
                      <span key={s.id} className="select-option">
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
        <button className="submit-btn">ساخت کاربر</button>
      </div>
    </section>
  );
};

export default MakeUser;
