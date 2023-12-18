import React, { useState } from "react";
import cross_icon from "../../../asset/images/seller-report/cross-icon.svg";
import magnifier_icon from "../../../asset/images/leads/magnifier.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import find_month from "../../functions/find-month";
import convert_to_persian from "../../functions/convert-to-persian";
const PickDate = ({ set_picked_seller, picked_seller }) => {
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
    <div className="pick-seller-date-pop-up-wrapper">
      <div className="pick-seller-date-wrapper">
        <div className="seller-pop-up-header">
          <h3 className="seller-header-title">
            انتخاب تاریخ - {picked_seller.fullname}
          </h3>
          <button
            className="close-pop-up"
            onClick={() => {
              set_picked_seller(false);
            }}
          >
            <img src={cross_icon} alt="بستن" />
          </button>
        </div>
        {/* <span className="search-input-wrapper">
          <img src={magnifier_icon} alt="جستجو" />
          <input type="text" placeholder="جستجو تاریخ" />
        </span> */}
        <div className="all-dates-wrapper" onClick={make_dates}>
          {make_dates()
            .reverse()
            .map((d, i) => (
              <Link
                to={`/seller/${picked_seller.id}-${d.month}-${d.year}`}
                className="date-item"
                key={i++}
              >
                {find_month(d.month)} {convert_to_persian(d.year)}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PickDate;
