import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import arrow_img from "../../asset/images/make-lead/arrow-up.svg";
import cross_icon from "../../asset/images/make-lead/cross-icon.svg";
import { DataContext } from "../data/datacontext";
import CreateSenario from "./create-senario/create-senario";
import Senarios from "./seanrios/senarios";
import LeadSources from "./lead-sources/lead-sources";
import CreateLeadSource from "./create-lead-source/creacte-lead-source";
import Formulars from "./formulars/formulars";
import CreateFormular from "./create-formular/create-formular";
const MakeLeadPackPage = () => {
  const { user, senarios } = useContext(DataContext);
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
          {choose_box === "lead" ? <LeadSources /> : <></>}
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
          {choose_box === "senario" ? <Senarios /> : <></>}
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
          {choose_box === "formular" ? <Formulars /> : <></>}
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
                <CreateLeadSource set_pop_up={set_pop_up} />
              </>
            ) : (
              <></>
            )}
            {pop_up === "senario" ? (
              <CreateSenario set_pop_up={set_pop_up} />
            ) : (
              <></>
            )}
            {pop_up === "formular" ? (
              <CreateFormular set_pop_up={set_pop_up} />
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

export default MakeLeadPackPage;
