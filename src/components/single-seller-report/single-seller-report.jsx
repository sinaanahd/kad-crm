import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import convert_to_persian from "../functions/convert-to-persian";
import split_in_three from "../functions/spilit_in_three";
import LittleLoading from "../reuseables/little-loading";
import axios from "axios";
import urls from "../../urls/url";
import find_month from "../functions/find-month";
import * as shamsi from "shamsi-date-converter";
import convert_days from "../functions/convert-days";
import DateRow from "./date-row/date-row";
import ReloadBtn from "../reuseables/reload-btn";

const SingleSellerReport = () => {
  const { sellers, products } = useContext(DataContext);
  const page_slug = window.location.pathname.split("/")[2];
  const [calls, set_calls] = useState(false);
  const [sales, set_sales] = useState(false);
  const [all_dates, set_all_dates] = useState(false);
  const [show_mode, set_show_mode] = useState("all");
  const [total_sale, set_total_sale] = useState(false);
  const [total_calls, set_total_calls] = useState(false);
  const [total_seller_share, set_total_seller_share] = useState(false);
  const [confirmed_seller_share, set_confirmed_seller_share] = useState(false);
  useEffect(() => {
    get_seller_data();
  }, []);
  const get_seller_data = (e) => {
    axios
      .get(urls.staff_work_report + page_slug)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          const calls = response.calls;
          const sales = response.sales;
          set_calls(calls);
          set_sales(sales);
          // console.log(res.data.response);
          make_full_month(calls, sales);
        } else {
          console.log(error);
          alert("مشکلی پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e.message);
        alert("مشکلی پیش آمده");
      });
  };
  const year = convert_to_persian(parseInt(page_slug.split("-")[2]));
  const month = find_month(parseInt(page_slug.split("-")[1]));
  const seller = sellers
    ? sellers.find((s) => s.id === parseInt(page_slug.split("-")[0]))
    : false;
  const check_date = (entry1, entry2) => {
    const time1 = entry1.split("T")[0].replaceAll("-", "/");
    const ordered_entry2 = `${entry2.split("/")[2]}/${entry2.split("/")[0]}/${
      entry2.split("/")[1]
    }`;
    const time2 = ordered_entry2;
    // console.log(time1, time2, time1 == time2);
    return time1 === time2;
  };
  const make_full_month = (calls, sales) => {
    let total_amount = 0;
    let total_calls = 0;
    let seller_share = 0;
    let seller_confirmed_share = 0;
    const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const month = parseInt(p2e(page_slug.split("-")[1]));
    const year = parseInt(page_slug.split("-")[2]);
    const days = [];
    if (month <= 6) {
      for (let i = 1; i <= 31; i++) {
        days.push(i);
      }
    } else {
      for (let i = 1; i <= 30; i++) {
        days.push(i);
      }
    }
    const all_dates = [];
    days.forEach((d) => {
      const date = new Date(shamsi.jalaliToGregorian(year, month, d).join("/"));
      const day_english = new Date(date).toLocaleDateString("en-us", {
        weekday: "long",
      });
      const date_calls = calls.filter((c) =>
        check_date(c.call_datetime, date.toLocaleDateString())
      );
      total_calls += date_calls.length;
      let date_payments = [];
      sales.forEach((s) => {
        const date_pays = s.payments.filter(
          (p) =>
            p.paying_datetime &&
            check_date(p.paying_datetime, date.toLocaleDateString())
        );
        if (date_pays.length !== 0) {
          date_payments = date_payments.concat(date_pays);
          date_pays.forEach((dp) => {
            if (s.pourcent) {
              seller_share += (dp.payment_amount * s.pourcent) / 100;
              if (dp.manager_confirmation) {
                seller_confirmed_share +=
                  (dp.payment_amount * s.pourcent) / 100;
              }
            } else {
              seller_share += (dp.payment_amount * 5) / 100;
            }
          });
        }
      });
      const obj = {
        id: d,
        perisan_date: date.toLocaleDateString("fa-ir"),
        day_week: convert_days(day_english),
        date_calls: date_calls,
        date_payments: date_payments,
      };
      all_dates.push(obj);
      date_payments.forEach((p) => {
        if (p.manager_confirmation) {
        }
        total_amount += p.payment_amount;
      });
    });
    set_total_sale(total_amount);
    set_total_calls(total_calls);
    set_total_seller_share(seller_share);
    set_confirmed_seller_share(seller_confirmed_share);
    set_all_dates(all_dates);
  };
  const no_call = all_dates
    ? all_dates.filter((d) => d.date_calls.length === 0)
    : false;
  const with_call = all_dates
    ? all_dates.filter((d) => d.date_calls.length !== 0)
    : false;
  const no_sale = all_dates
    ? all_dates.filter((d) => d.date_payments.length === 0)
    : false;
  const with_sale = all_dates
    ? all_dates.filter((d) => d.date_payments.length !== 0)
    : false;
  const show_result = (entry) => {
    switch (entry) {
      case "all":
        return all_dates;
      case "no_call":
        return no_call;
      case "with_call":
        return with_call;
      case "no_sale":
        return no_sale;
      case "with_sale":
        return with_sale;
      default:
        return [];
    }
  };
  const handle_relaod = () => {
    set_all_dates(false);
    set_show_mode("all");
    set_total_calls(false);
    set_total_sale(false);
    set_total_seller_share(false);
    set_confirmed_seller_share(false);
    get_seller_data();
  };
  return (
    <>
      <Helmet>
        <title>
          {seller ? seller.fullname : ""} - {month} {year}
        </title>
      </Helmet>
      <section className="single-seller-report-page-wrapper">
        <ReloadBtn click={handle_relaod} />
        <div className="section-header">
          <h1 className="seller-name-date">
            {seller ? seller.fullname : ""} - {month} {year}
          </h1>
          <div className="table-filters">
            <button
              onClick={() => {
                set_show_mode("all");
              }}
              className={
                show_mode === "all" ? "filter-btn active" : "filter-btn"
              }
            >
              همه
            </button>
            <button
              onClick={() => {
                set_show_mode("no_call");
              }}
              className={
                show_mode === "no_call" ? "filter-btn active" : "filter-btn"
              }
            >
              بدون تماس
            </button>
            <button
              onClick={() => {
                set_show_mode("with_call");
              }}
              className={
                show_mode === "with_call" ? "filter-btn active" : "filter-btn"
              }
            >
              با تماس
            </button>
            <button
              onClick={() => {
                set_show_mode("no_sale");
              }}
              className={
                show_mode === "no_sale" ? "filter-btn active" : "filter-btn"
              }
            >
              بدون فروش
            </button>
            <button
              onClick={() => {
                set_show_mode("with_sale");
              }}
              className={
                show_mode === "with_sale" ? "filter-btn active" : "filter-btn"
              }
            >
              با فروش
            </button>
          </div>
        </div>
        <div className="table-part">
          <div className="table-row table-header-row">
            <span className="table-item table-header-item day-col">
              روز هفته
            </span>
            <span className="table-item table-header-item date-col">تاریخ</span>
            <span className="table-item table-header-item call-count-col">
              تعداد تماس
            </span>
            <span className="table-item table-header-item sold-prod-count-col">
              تعداد محصولات فروخته شده
            </span>
            <span className="table-item table-header-item">شرح اقلام</span>
            <span className="table-item table-header-item price-col">
              مبلغ فروش
            </span>
          </div>
          {all_dates ? (
            show_result(show_mode).length !== 0 ? (
              show_result(show_mode).map((date) => (
                <DateRow key={date.id} date={date} />
              ))
            ) : (
              "موردی برای نمایش وجود ندارد"
            )
          ) : (
            <LittleLoading />
          )}
        </div>
        <div className="final-reports">
          <div className="total-month-sale-wrapper">
            <h2 className="total-sale-title">کل فروش ماه {month}</h2>
            <span className="sale-amount-wrapper">
              {total_sale || total_sale === 0 ? (
                split_in_three(convert_to_persian(total_sale))
              ) : (
                <LittleLoading />
              )}{" "}
              تومان
            </span>
          </div>
          <div className="total-month-sale-wrapper call-counts-reports">
            <h2 className="total-sale-title ">سهم فروشنده</h2>
            <span className="sale-amount-wrapper">
              {total_seller_share || total_seller_share === 0 ? (
                split_in_three(convert_to_persian(total_seller_share))
              ) : (
                <LittleLoading />
              )}{" "}
              تومان
            </span>
          </div>
          <div className="total-month-sale-wrapper call-counts-reports">
            <h2 className="total-sale-title ">پورسانت تایید شده</h2>
            <span className="sale-amount-wrapper">
              {confirmed_seller_share || confirmed_seller_share === 0 ? (
                split_in_three(convert_to_persian(confirmed_seller_share))
              ) : (
                <LittleLoading />
              )}{" "}
              تومان
            </span>
          </div>
          <div className="total-month-sale-wrapper call-counts-reports">
            <h2 className="total-sale-title ">تعداد کل تماس ها</h2>
            <span className="sale-amount-wrapper">
              {total_calls || total_calls === 0 ? (
                split_in_three(convert_to_persian(total_calls))
              ) : (
                <LittleLoading />
              )}{" "}
              تماس
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleSellerReport;
