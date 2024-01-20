import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import { DataContext } from "../data/datacontext";
import find_month from "../functions/find-month";
import convert_to_persian from "../functions/convert-to-persian";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MySaleDiagram from "./my-sales-diagram/my-sale-diagram";

const My_sales = () => {
  const { user } = useContext(DataContext);
  const start_date = new Date("11/22/2023").toLocaleDateString("fa-ir");
  const make_dates = (e) => {
    const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const persian_month = parseInt(p2e(start_date.split(["/"])[1]));
    const persian_year = parseInt(p2e(start_date.split(["/"])[0]));
    // const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
    const today = new Date().toLocaleDateString("fa-ir");
    const today_month = parseInt(p2e(today.split(["/"])[1]));
    const today_year = parseInt(p2e(today.split(["/"])[0]));
    // 09128512804
    // const today_month = 6;
    // const today_year = 1403;
    const months = [];
    for (let j = persian_year; j <= today_year; j++) {
      let till_month = 12;
      let from_month = 1;
      if (j === persian_year) {
        from_month = persian_month;
      }
      if (j === today_year) {
        till_month = today_month;
      }
      for (let i = from_month; i <= till_month; i++) {
        months.push({
          month: i,
          year: j,
        });
      }
    }
    return months;
  };
  return (
    <>
      <Helmet>
        <title>فروش های من</title>
      </Helmet>
      <section className="my-sales-diagram-report my-sales-page">
        <div className="section-header">
          <h1 className="page-title">روند فروش من</h1>
        </div>
        <div className="diagram-wrapper">
          <MySaleDiagram />
        </div>
      </section>
      <section className="my-sales-page mm-width">
        <div className="section-header">
          <h1 className="page-title">گزارش فروش</h1>
        </div>
        <div className="seller-months">
          {make_dates()
            .reverse()
            .map((d, i) => (
              <Link
                to={`/sale-report/${user.id}-${d.month}-${d.year}`}
                key={i++}
                className="month-wrapper"
              >
                {find_month(d.month)} {convert_to_persian(d.year)}
              </Link>
            ))}
        </div>
      </section>
      <section className="my-sales-page mm-width">
        <div className="section-header">
          <h1 className="page-title">فروش های من</h1>
        </div>
        <div className="seller-months">
          {make_dates()
            .reverse()
            .map((d, i) => (
              <Link
                to={`/my-full-sale/${user.id}-${d.month}-${d.year}`}
                key={i++}
                className="month-wrapper"
              >
                {find_month(d.month)} {convert_to_persian(d.year)}
              </Link>
            ))}
        </div>
      </section>
    </>
  );
};

export default My_sales;
