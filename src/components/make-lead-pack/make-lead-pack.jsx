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
import Sellers from "./sellers/sellers";
import axios from "axios";
import urls from "../../urls/url";
const MakeLeadPackPage = () => {
  const { user, senarios } = useContext(DataContext);
  const [pop_up, set_pop_up] = useState(false);
  const [choose_box, set_choose_box] = useState(false);
  const [title, set_title] = useState(false);
  const [file, set_file] = useState(false);
  const [seller, set_seller] = useState(false);
  const [lead_source, set_lead_source] = useState(false);
  const [senario, set_senario] = useState(false);
  const [formular, set_formular] = useState(false);
  const [pause, setPause] = useState(false);

  const handle_choose_box = (entry) => {
    if (entry !== choose_box) {
      set_choose_box(entry);
    } else {
      set_choose_box(false);
    }
  };
  const handle_title = (e) => {
    const value = e.target.value;
    if (value.length > 2) {
      set_title(value);
    } else {
      set_title(false);
    }
  };
  const send_data = () => {
    // const send_obj2 = {
    //   title: title,
    //   seller: seller,
    //   lead_source: lead_source,
    //   senario: senario,
    //   formular: formular,
    //   file: "",
    // };
    const send_obj = new FormData();
    send_obj.append("title", title);
    send_obj.append("excel_file", file);
    send_obj.append("source_id", lead_source.id);
    send_obj.append("formula_id", formular.id);
    send_obj.append("callScenario_id", senario.id);
    send_obj.append("target_seller_id", seller.id);
    console.log(send_obj);
    if (title && file && lead_source && formular && senario && seller) {
      setPause(true);
      axios
        .post(urls.lead_packs, send_obj)
        .then((res) => {
          setPause(false);
          const { error, response, result } = res.data;
          // console.log(res.data);
          if (result) {
            localStorage.setItem("lead_packs", JSON.stringify(response));
          } else {
            alert("مشکلی پیش آمده دوباره تلاش کنید");
            console.log(error);
          }
        })
        .catch((e) => {
          setPause(false);
          console.log(e.message);
        });
    } else {
      alert("اطلاعات به طور کامل وارد نشده است");
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      set_file(file);
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
            <input
              type="text"
              placeholder="عنوان را وارد کنید"
              onInput={handle_title}
            />
          </span>
        </div>
        <div className="input-wrapper">
          <span className="input-title">فایل اکسل لید پک</span>
          <span className="input-box upload-box">
            <span className="upload-text">
              {file ? file.name : "آپلود فایل"}
            </span>
            <input
              type="file"
              name="excel-input"
              id="excel-input"
              onChange={handleFileChange}
              accept=".xlsx"
            />
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
            <span className="custom-input">
              {seller ? seller.fullname : "فروشنده را انتخاب کنید"}
            </span>
            <img src={arrow_img} alt="باز کردن / بستن" />
          </span>
          {choose_box === "seller" ? (
            <Sellers set_seller={set_seller} set_choose_box={set_choose_box} />
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
            <span className="custom-input">
              {lead_source ? lead_source.title : "لید سورس را انتخاب کنید"}
            </span>
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
            <LeadSources
              set_lead_source={set_lead_source}
              set_choose_box={set_choose_box}
            />
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
            <span className="custom-input">
              {senario ? senario.scenario_name : "سناریوی تماس را انتخاب کنید"}
            </span>
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
            <Senarios
              set_senario={set_senario}
              set_choose_box={set_choose_box}
            />
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
            <span className="custom-input">
              {formular ? formular.title : "فرمول پورسانت را انتخاب کنید"}
            </span>
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
            <Formulars
              set_formular={set_formular}
              set_choose_box={set_choose_box}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="submit-lead-pack-wrapper">
          {pause ? (
            <span className="sumbit-lead-pack-btn">
              <LittleLoading />
            </span>
          ) : (
            <span className="sumbit-lead-pack-btn" onClick={send_data}>
              ثبت لید پک{" "}
            </span>
          )}
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
