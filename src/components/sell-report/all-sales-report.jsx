import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import urls from "../../urls/url";
import arrow from "../../asset/images/make-lead/arrow-up.svg";
import Diagram from "./diagram/diagram";
import LastTwoMonthDiagrams from "./last-two-month-diagram/last-two-month-diagram";
import MonthlyDiagram from "./monthly-diagram/monthly-diagram";
import ReloadBtn from "../reuseables/reload-btn";
const AllSalesReport = () => {
  const { set_all_payments, get_all_payments } = useContext(DataContext);
  const handle_relaod = () => {
    set_all_payments(false);
    get_all_payments(true);
  };
  return (
    <>
      <Helmet>
        <title>گزارش تمامی فروش ها</title>
      </Helmet>
      <div className="sell-report-page-wrapper">
        <section className="section-header">
          <h1 className="title">گزارش تمامی فروش ها</h1>
          <ReloadBtn click={handle_relaod} />
        </section>
        <section className="diagram-wrapper">
          <h2 className="section-title">آمار کلی فروش ماهانه</h2>
          <MonthlyDiagram />
        </section>
        <section className="diagram-wrapper">
          <h2 className="section-title">آمار کلی فروش تمامی فروشندگان</h2>
          <Diagram />
        </section>
        <section className="diagram-wrapper">
          <h2 className="section-title">آمار کلی فروش ماه دو ماه اخیر</h2>
          <LastTwoMonthDiagrams />
        </section>
      </div>
    </>
  );
};

export default AllSalesReport;
