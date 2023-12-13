import React, { useContext, useState } from "react";
import LittleLoading from "../../../reuseables/little-loading";
import { DataContext } from "../../../data/datacontext";
import convert_to_persian from "../../../functions/convert-to-persian";
import axios from "axios";
import urls from "../../../../urls/url";
const LeadPackItem = ({ lp }) => {
  const [edit, set_edit] = useState(false);
  const [file, set_file] = useState(false);
  const [pause, set_pause] = useState(false);
  const { formular, sellers, lead_soursces, senarios } =
    useContext(DataContext);
  const formol = formular
    ? formular.find((f) => f.id === lp.formula_id)
    : false;
  const source = lead_soursces
    ? lead_soursces.find((ls) => ls.id === lp.source_id)
    : false;
  const seller = sellers
    ? sellers.find((s) => s.id === lp.target_seller_id)
    : false;
  const senario = senarios
    ? senarios.find((s) => s.id === lp.callScenario_id)
    : false;
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      set_file(file);
    }
  };
  const send_data = () => {
    if (file) {
      set_pause(true);
      const send_obj = new FormData();
      send_obj.append("file", file);
      axios
        .patch(urls.edit_lead_pack + `${lp.id}`, send_obj)
        .then((res) => {
          console.log(res);
          set_pause(false);
        })
        .catch((e) => {
          alert("مشکلی پیش آمده");
          console.log(e.message);
          set_pause(false);
        });
    } else {
      alert("فایل انتخاب نشده است");
    }
  };
  return (
    <div className="lead-pack">
      <span className="lead-pack-title">{lp.title}</span>
      <span className="data-item">
        <span className="item-title">فرمول پورسانت : </span>
        <span className="item-value">
          {formol ? formol.title : <LittleLoading />}
        </span>
      </span>
      <span className="data-item">
        <span className="item-title">منبع لید پک : </span>
        <span className="item-value">
          {source ? source.title : <LittleLoading />}
        </span>
      </span>
      <span className="data-item">
        <span className="item-title">فروشنده : </span>
        <span className="item-value">
          {seller ? seller.fullname : <LittleLoading />}
        </span>
      </span>
      <span className="data-item">
        <span className="item-title">سناریو : </span>
        <span className="item-value">
          {senario ? senario.scenario_name : <LittleLoading />}
        </span>
      </span>
      <button
        className="edit-lead-pack-file-btn"
        onClick={() => {
          set_edit(!edit);
        }}
      >
        تغییر فایل لیدپک
      </button>
      {edit ? (
        <div className="make-lead-pack-changes-wrapper">
          <span className="file-name-wrapper">
            {file ? file.name : "انتخاب نشده"}
          </span>
          <span className="file-changes-inputs-wrapper">
            <label htmlFor="change_pdf" className="get-file-btn">
              انتخاب فایل
            </label>
            <input
              type="file"
              name="change_pdf"
              id="change_pdf"
              accept=".xlsx"
              onChange={handleFileChange}
            />
          </span>
          {pause ? (
            <button className="send-file-changes-btn">
              <LittleLoading />
            </button>
          ) : (
            <button className="send-file-changes-btn" onClick={send_data}>
              ثبت تغییرات
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LeadPackItem;
