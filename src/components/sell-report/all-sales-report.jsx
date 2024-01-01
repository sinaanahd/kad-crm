import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import urls from "../../urls/url";
import arrow from "../../asset/images/make-lead/arrow-up.svg";
import Diagram from "./diagram/diagram";
const AllSalesReport = () => {
  return (
    <>
      <Helmet>
        <title>گزارش تمامی فروش ها</title>
      </Helmet>
      <div className="sell-report-page-wrapper">
        <section className="section-header">
          <h1 className="title">گزارش تمامی فروش ها</h1>
          <div className="pick-dates-wrapper">
            <div className="pick-date-wrapper">
              <div className="pick-date-box">
                <span className="text">روز</span>
                <img src={arrow} alt="بازکردن" />
              </div>
            </div>
            <div className="pick-date-wrapper">
              <div className="pick-date-box">
                <span className="text">ماه</span>
                <img src={arrow} alt="بازکردن" />
              </div>
            </div>
            <div className="pick-date-wrapper">
              <div className="pick-date-box">
                <span className="text">سال</span>
                <img src={arrow} alt="بازکردن" />
              </div>
            </div>
          </div>
        </section>
        <section className="diagram-wrapper">
          <Diagram />
        </section>
      </div>
    </>
  );
};

export default AllSalesReport;
