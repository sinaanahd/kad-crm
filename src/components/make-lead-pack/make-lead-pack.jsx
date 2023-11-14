import React, { useState } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import arrow_img from "../../asset/images/make-lead/arrow-up.svg";
import cross_icon from "../../asset/images/make-lead/cross-icon.svg";
const MakeLeadPackPage = () => {
  const [pop_up, set_pop_up] = useState(false);
  const [choose_box, set_choose_box] = useState(false);
  const handle_choose_box = (entry) => {
    if (entry !== choose_box) {
      set_choose_box(entry);
    } else {
      set_choose_box(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>ساختن لیدپک جدید</title>
      </Helmet>
      <div className="make-lead-pack-page">
        <div className="box-header">
          <h1 className="title">ساخت لیدپک جدید</h1>
        </div>
        <div className="input-wrapper">
          <span className="input-title">عنوان</span>
          <span className="input-box dark-bg">
            <input type="text" placeholder="عنوان را وارد کنید" />
          </span>
        </div>
        <div className="input-wrapper">
          <span className="input-title">فایل اکسل لید پک</span>
          <span className="input-box upload-box">
            <span className="upload-text">آپلود فایل</span>
            <input type="file" name="excel-input" id="excel-input" />
            <label htmlFor="excel-input" className="file-label">
              انتخاب
            </label>
          </span>
        </div>
        <div className="input-wrapper">
          <span className="input-title">فروشنده ی هدف</span>
          <span
            className="input-box custom-select"
            onClick={() => {
              handle_choose_box("seller");
            }}
          >
            <span className="custom-input">فروشنده را انتخاب کنید</span>
            <img src={arrow_img} alt="باز کردن / بستن" />
          </span>
          {choose_box === "seller" ? (
            <div className="choose-box-item">
              <div className="search-choose-item">
                <input type="text" placeholder="جستجو" />
              </div>
              <div className="choose-items">
                <span className="choose-item">کاظم کاظمی</span>
                <span className="choose-item">مریم مهدیاری</span>
                <span className="choose-item">شهریار قنبری</span>
                <span className="choose-item">نازنین زهرا میترا نجاتی</span>
                <span className="choose-item">منصور اکبری فرد</span>
                <span className="choose-item">فاطمه سرخوش</span>
                <span className="choose-item">مجتبی کاس زاده</span>
                <span className="choose-item">آرمیتا نازنینی فرد</span>
                <span className="choose-item">زهرا احمدی</span>
                <span className="choose-item">کریم آق منگل</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="input-wrapper">
          <span className="input-title">لید سورس</span>
          <span
            className="input-box custom-select"
            onClick={() => {
              handle_choose_box("lead");
            }}
          >
            <span className="custom-input">لید سورس را انتخاب کنید</span>
            <img src={arrow_img} alt="باز کردن / بستن" />
          </span>
          <span
            className="make-new-btn"
            onClick={() => {
              set_pop_up("lead");
            }}
          >
            <span className="plus-wrapper">+</span>
            <span className="btn-text">ساخت لید سورس جدید</span>
          </span>
          {choose_box === "lead" ? (
            <div className="choose-box-item">
              <div className="search-choose-item">
                <input type="text" placeholder="جستجو" />
              </div>
              <div className="choose-items">
                <span className="choose-item">لید سورس ۱</span>
                <span className="choose-item">لید سورس ۲</span>
                <span className="choose-item">لید سورس ۳</span>
                <span className="choose-item">لید سورس ۴</span>
                <span className="choose-item">لید سورس ۵</span>
                <span className="choose-item">لید سورس ۶</span>
                <span className="choose-item">لید سورس ۷</span>
                <span className="choose-item">لید سورس ۸</span>
                <span className="choose-item">لید سورس ۹</span>
                <span className="choose-item">لید سورس ۱۰</span>
                <span className="choose-item">لید سورس ۱۱</span>
                <span className="choose-item">لید سورس ۱۲</span>
                <span className="choose-item">لید سورس ۱۳</span>
                <span className="choose-item">لید سورس ۱۴</span>
                <span className="choose-item">لید سورس ۱۵</span>
                <span className="choose-item">لید سورس ۱۶</span>
                <span className="choose-item">لید سورس ۱۷</span>
                <span className="choose-item">لید سورس ۱۸</span>
                <span className="choose-item">لید سورس ۱۹</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="input-wrapper">
          <span className="input-title">سناریوی تماس</span>
          <span
            className="input-box custom-select"
            onClick={() => {
              handle_choose_box("senario");
            }}
          >
            <span className="custom-input">سناریوی تماس را انتخاب کنید</span>
            <img src={arrow_img} alt="باز کردن / بستن" />
          </span>
          <span
            className="make-new-btn"
            onClick={() => {
              set_pop_up("senario");
            }}
          >
            <span className="plus-wrapper">+</span>
            <span className="btn-text">ساخت سناریوی جدید</span>
          </span>
          {choose_box === "senario" ? (
            <div className="choose-box-item">
              <div className="search-choose-item">
                <input type="text" placeholder="جستجو" />
              </div>
              <div className="choose-items">
                <span className="choose-item">سناریو تماس ۱</span>
                <span className="choose-item">سناریو تماس ۲</span>
                <span className="choose-item">سناریو تماس ۳</span>
                <span className="choose-item">سناریو تماس ۴</span>
                <span className="choose-item">سناریو تماس ۵</span>
                <span className="choose-item">سناریو تماس ۶</span>
                <span className="choose-item">سناریو تماس ۷</span>
                <span className="choose-item">سناریو تماس ۸</span>
                <span className="choose-item">سناریو تماس ۹</span>
                <span className="choose-item">سناریو تماس ۱۰</span>
                <span className="choose-item">سناریو تماس ۱۱</span>
                <span className="choose-item">سناریو تماس ۱۲</span>
                <span className="choose-item">سناریو تماس ۱۳</span>
                <span className="choose-item">سناریو تماس ۱۴</span>
                <span className="choose-item">سناریو تماس ۱۵</span>
                <span className="choose-item">سناریو تماس ۱۶</span>
                <span className="choose-item">سناریو تماس ۱۷</span>
                <span className="choose-item">سناریو تماس ۱۸</span>
                <span className="choose-item">سناریو تماس ۱۹</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="input-wrapper">
          <span className="input-title">فرمول پورسانت</span>
          <span
            className="input-box custom-select"
            onClick={() => {
              handle_choose_box("formular");
            }}
          >
            <span className="custom-input">فرمول پورسانت را انتخاب کنید</span>
            <img src={arrow_img} alt="باز کردن / بستن" />
          </span>
          <span
            className="make-new-btn"
            onClick={() => {
              set_pop_up("formular");
            }}
          >
            <span className="plus-wrapper">+</span>
            <span className="btn-text">ساخت فرمول پورسانت</span>
          </span>
          {choose_box === "formular" ? (
            <div className="choose-box-item">
              <div className="search-choose-item">
                <input type="text" placeholder="جستجو" />
              </div>
              <div className="choose-items">
                <span className="choose-item">فرمول ۱</span>
                <span className="choose-item">فرمول ۲</span>
                <span className="choose-item">فرمول ۳</span>
                <span className="choose-item">فرمول ۴</span>
                <span className="choose-item">فرمول ۵</span>
                <span className="choose-item">فرمول ۶</span>
                <span className="choose-item">فرمول ۷</span>
                <span className="choose-item">فرمول ۸</span>
                <span className="choose-item">فرمول ۹</span>
                <span className="choose-item">فرمول ۱۰</span>
                <span className="choose-item">فرمول ۱۱</span>
                <span className="choose-item">فرمول ۱۲</span>
                <span className="choose-item">فرمول ۱۳</span>
                <span className="choose-item">فرمول ۱۴</span>
                <span className="choose-item">فرمول ۱۵</span>
                <span className="choose-item">فرمول ۱۶</span>
                <span className="choose-item">فرمول ۱۷</span>
                <span className="choose-item">فرمول ۱۸</span>
                <span className="choose-item">فرمول ۱۹</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="submit-lead-pack-wrapper">
          <span className="sumbit-lead-pack-btn">ثبت لید پک </span>
        </div>
      </div>
      {pop_up ? (
        <div className="lead-pack-pop-up-wrapper">
          <div className="pop-up-box">
            <span className="cross-wrapper">
              <img
                src={cross_icon}
                alt="بستن"
                onClick={() => {
                  set_pop_up(false);
                }}
              />
            </span>
            {pop_up === "lead" ? (
              <>
                <span className="make-title">ساخت لید سورس</span>
                <div className="pop-options">
                  <span className="pop-up-input-wrapper">
                    <span className="pop-input-title">عنوان</span>
                    <input type="text" placeholder="عنوان را وارد کنید" />
                  </span>
                  <span className="pop-up-input-wrapper">
                    <span className="pop-input-title">عنوان عمومی</span>
                    <input type="text" placeholder="عنوان عمومی را وارد کنید" />
                  </span>
                </div>
                <span className="pop-up-make-btn">ساخت لید سورس</span>
              </>
            ) : (
              <></>
            )}
            {pop_up === "senario" ? (
              <>
                <span className="make-title">ساخت سناریو تماس</span>
                <div className="pop-options">
                  <span className="pop-up-input-wrapper">
                    <span className="pop-input-title">عنوان</span>
                    <input type="text" placeholder="عنوان را وارد کنید" />
                  </span>
                  <span className="pop-up-input-wrapper">
                    <span className="pop-input-title">متن سناریو</span>
                    <textarea placeholder="عنوان عمومی را وارد کنید" />
                  </span>
                </div>
                <span className="pop-up-make-btn">ساخت سناریو تماس</span>
              </>
            ) : (
              <></>
            )}
            {pop_up === "formular" ? (
              <>
                <span className="make-title">ساخت فرمول پورسانت</span>
                <div className="pop-options">
                  <span className="pop-up-input-wrapper">
                    <span className="pop-input-title">عنوان</span>
                    <input type="text" placeholder="عنوان را وارد کنید" />
                  </span>
                  <span className="pop-up-input-wrapper">
                    <span className="pop-input-title">درصد نقدی</span>
                    <input type="num" placeholder="درصد نقدی را وارد کنید" />
                  </span>
                  <span className="pop-up-input-wrapper">
                    <span className="pop-input-title">درصد قسطب</span>
                    <input type="num" placeholder="درصد قسطی را وارد کنید" />
                  </span>
                </div>
                <span className="pop-up-make-btn">ساخت فرمول پورسانت</span>
              </>
            ) : (
              <></>
            )}
            {/* <span className="make-title">ساخت لید سورس</span>
            <div className="pop-options">
              <span className="pop-up-input-wrapper">
                <span className="pop-input-title">عنوان</span>
                <input type="text" placeholder="عنوان را وارد کنید" />
              </span>
              <span className="pop-up-input-wrapper">
                <span className="pop-input-title">عنوان عمومی</span>
                <input type="text" placeholder="عنوان عمومی را وارد کنید" />
              </span>
            </div>
            <span className="pop-up-make-btn">ساخت لید سورس</span> */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MakeLeadPackPage;
