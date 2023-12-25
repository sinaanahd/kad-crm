import React, { useContext, useEffect, useState } from "react";
import urls from "../../urls/url";
import { DataContext } from "../data/datacontext";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import split_in_three from "../functions/spilit_in_three";
import convert_to_persian from "../functions/convert-to-persian";
import PaymentRow from "./payment-row/payment-row";
import find_month from "../functions/find-month";
import * as shamsi from "shamsi-date-converter";
import axios from "axios";
import ReloadBtn from "../reuseables/reload-btn";

const My_sale_month = () => {
  const { user } = useContext(DataContext);
  const [payments, set_payments] = useState(false);
  const [total_sale, set_total_sale] = useState(false);
  const [total_share, set_total_share] = useState(false);
  const [total_confirmed_pay, set_total_confirmed_pay] = useState(false);
  const [total_unconfirmed_pay, set_total_unconfirmed_pay] = useState(false);
  const page_slug = window.location.pathname.split("/")[2];
  const year = convert_to_persian(parseInt(page_slug.split("-")[2]));
  const month = find_month(parseInt(page_slug.split("-")[1]));
  const handle_time_period = (entry_date) => {
    const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const month = parseInt(p2e(page_slug.split("-")[1]));
    const year = parseInt(page_slug.split("-")[2]);
    const start_date = new Date(
      shamsi.jalaliToGregorian(year, month, 1).join("/")
    ).getTime();
    const final_date = new Date(
      shamsi.jalaliToGregorian(year, month, month <= 6 ? 31 : 30).join("/")
    ).getTime();
    const result = start_date <= entry_date && final_date >= entry_date;
    return result;
  };
  const fill_payments = (sales) => {
    let payments = [];
    let confirmed_pay = 0;
    let unconfirmed_pay = 0;
    let total_sale = 0;
    let total_share = 0;

    sales.forEach((s) => {
      let paid_payments = s.payments.filter(
        (p) =>
          p.paying_datetime &&
          handle_time_period(new Date(p.paying_datetime).getTime())
      );
      if (paid_payments.length !== 0) {
        let altered_paid_payments = [];
        paid_payments.forEach((pp) => {
          const obj = {
            ...pp,
            phone: s.buyer_phone_number,
            pourcant: s.pourcent ? s.pourcent / 100 : 5 / 100,
          };
          altered_paid_payments.push(obj);
        });
        payments = payments.concat(altered_paid_payments);
      }
    });
    payments.forEach((p) => {
      if (p.manager_confirmation) {
        confirmed_pay += p.payment_amount;
        total_share += p.payment_amount * p.pourcant;
      } else {
        unconfirmed_pay += p.payment_amount;
      }
      total_sale += p.payment_amount;
    });
    set_total_confirmed_pay(confirmed_pay);
    set_total_unconfirmed_pay(unconfirmed_pay);
    set_total_sale(total_sale);
    set_total_share(total_share);
    set_payments(payments);
  };
  useEffect(() => {
    get_month_report();
  }, []);
  const get_month_report = (e) => {
    axios
      .get(
        `${urls.staff_sales_report}${user.id}-${parseInt(
          page_slug.split("-")[1]
        )}-${parseInt(page_slug.split("-")[2])}`
      )
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          const sales = response;
          fill_payments(sales);
        } else {
          alert("مشکلی پیش آمده");
          console.log(error);
        }
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e.message);
        alert("مشکلی پیش آمده");
      });
  };
  const handle_report = (e) => {
    set_payments(false);
    set_total_confirmed_pay(false);
    set_total_sale(false);
    set_total_share(false);
    set_total_unconfirmed_pay(false);
    get_month_report();
  };
  return (
    <>
      <Helmet>
        <title>
          فروش های {month} {year}
        </title>
      </Helmet>
      <section className="my-sale-month-page mm-width">
        <div className="section-header" onClick={handle_time_period}>
          <h1 className="page-title">
            فروش های {month} {year}
          </h1>
          <ReloadBtn click={handle_report} />
        </div>
        <div className="month-infos-wrapper">
          <div className="month-info-wrapper border-need">
            <h2 className="month-info-title">کل فروش ماه</h2>
            <span className="month-info-value">
              {total_sale || total_sale === 0 ? (
                split_in_three(convert_to_persian(total_sale))
              ) : (
                <LittleLoading />
              )}{" "}
              تومان
            </span>
          </div>
          <div className="month-info-wrapper border-need">
            <h2 className="month-info-title">پورسانت ماه</h2>
            <span className="month-info-value">
              {total_share || total_share === 0 ? (
                split_in_three(convert_to_persian(total_share))
              ) : (
                <LittleLoading />
              )}{" "}
              تومان
            </span>
          </div>
          <div className="month-info-wrapper">
            <h2 className="month-info-title">پرداختی تایید شده</h2>
            <span className="month-info-value">
              {total_confirmed_pay || total_confirmed_pay === 0 ? (
                split_in_three(convert_to_persian(total_confirmed_pay))
              ) : (
                <LittleLoading />
              )}{" "}
              تومان
            </span>
          </div>
          <div className="month-info-wrapper">
            <h2 className="month-info-title">پرداختی تایید نشده</h2>
            <span className="month-info-value">
              {total_unconfirmed_pay || total_unconfirmed_pay === 0 ? (
                split_in_three(convert_to_persian(total_unconfirmed_pay))
              ) : (
                <LittleLoading />
              )}{" "}
              تومان
            </span>
          </div>
        </div>
        <div className="month-payments-table">
          <div className="payment-table-row payment-table-header-row">
            <span className="payment-table-item payment-table-header-item date-col">
              تاریخ
            </span>
            <span className="payment-table-item payment-table-header-item prod-count-col">
              نام
            </span>
            <span className="payment-table-item payment-table-header-item phone-number-col">
              تلفن
            </span>
            <span className="payment-table-item payment-table-header-item">
              شرح اقلام
            </span>
            <span className="payment-table-item payment-table-header-item price-col">
              مبلغ فروش
            </span>
            <span className="payment-table-item payment-table-header-item share-col">
              پورسانت
            </span>
          </div>
          {payments ? (
            payments.length !== 0 ? (
              payments.map((p) => <PaymentRow payment={p} key={p.payment_id} />)
            ) : (
              "موردی برای نمایش موجود نیست"
            )
          ) : (
            <LittleLoading />
          )}
        </div>
      </section>
    </>
  );
};

export default My_sale_month;
