import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import { DataContext } from "../data/datacontext";
import convert_to_persian from "../functions/convert-to-persian";
import CallResults from "./call-results/call-results";
import LeadPacks from "./lead-packs/lead-packs";

const AddNewDatas = () => {
  const { lead_packs, formular, lead_soursces, senarios } =
    useContext(DataContext);
  return (
    <>
      <Helmet>
        <title>اضافه کردن دیتا</title>
      </Helmet>
      <div className="add-new-datas-page">
        <CallResults />
        <LeadPacks />
        <section className="formulars-box box-style">
          <div className="box-header">
            <span className="box-title">تمامی فرمول های پورسانت</span>
          </div>
          <div className="all-formulars all-wrapper">
            {formular ? (
              formular.map((f, i) => (
                <div key={i++} className="formular">
                  <span className="formular-data-box">
                    <span className="formular-data-title">درصد نقدی</span>
                    <span className="formular-data-num">
                      {convert_to_persian(f.naghdi_percent)}
                    </span>
                  </span>
                  <span className="formular-data-box">
                    <span className="formular-data-title">درصد قسطی</span>
                    <span className="formular-data-num">
                      {convert_to_persian(f.ghesti_percent)}
                    </span>
                  </span>
                  <div className="all-btns">
                    <span className="edit-btn f-btn">ویرایش</span>
                    <span className="delete-btn f-btn">حذف</span>
                  </div>
                </div>
              ))
            ) : (
              <LittleLoading />
            )}
          </div>
        </section>
        <section className="box-style lead-sources-box">
          <div className="box-header">
            <span className="box-title">تمامی لید سورس ها</span>
          </div>
          <div className="all-lead-sources all-wrapper">
            {lead_soursces ? (
              lead_soursces.map((ls) => (
                <div key={ls.id} className="lead-source">
                  <span className="lead-source-title">{ls.title}</span>
                  <div className="all-btns">
                    <span className="edit-btn f-btn">ویرایش</span>
                    <span className="delete-btn f-btn">حذف</span>
                  </div>
                </div>
              ))
            ) : (
              <LittleLoading />
            )}
          </div>
        </section>
        <section className="all-senarios-box box-style">
          <div className="box-header">
            <span className="box-title">تمامی سناریو ها</span>
          </div>
          <div className="all-senarios all-wrapper">
            {senarios ? (
              senarios.map((s) => (
                <div key={s.id} className="senario-wrapper">
                  <span className="senario-title">{s.scenario_name}</span>
                  <p className="senario-text">{s.scenario_text}</p>
                  <div className="all-btns">
                    <span className="edit-btn f-btn">ویرایش</span>
                    <span className="delete-btn f-btn">حذف</span>
                    <span className="show-details f-btn">مشاهده جزئیات</span>
                  </div>
                </div>
              ))
            ) : (
              <LittleLoading />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default AddNewDatas;
