import React, { useContext, useEffect, useState } from "react";
import urls from "../../urls/url";
import { DataContext } from "../data/datacontext";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import split_in_three from "../functions/spilit_in_three";
import convert_to_persian from "../functions/convert-to-persian";
import find_month from "../functions/find-month";
import * as shamsi from "shamsi-date-converter";
import axios from "axios";
import ReloadBtn from "../reuseables/reload-btn";
const SingleSellerSale = () => {
  const { user, all_users } = useContext(DataContext);
  const page_slug = window.location.pathname.split("/")[2];
  const [sales, set_sales] = useState(false);
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
  const year = convert_to_persian(parseInt(page_slug.split("-")[2]));
  const month = find_month(parseInt(page_slug.split("-")[1]));

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
          set_sales(sales);
          console.log(sales);
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
  return (
    <>
      <title>
        فروش های {month} {year}
      </title>
      <div className="single-seller-sale-report">
        <section className="section-header">
          <h1 className="page-title">
            فروش های {month} {year}
          </h1>
          <ReloadBtn />
        </section>
        <div className="all-sales-table-wrapper">
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
            <span className="payment-table-item payment-table-header-item price-col">
              مبلغ فروش
            </span>
            <span className="payment-table-item payment-table-header-item">
              شرح اقلام
            </span>
            <span className="payment-table-item payment-table-header-item share-col">
              پرداختی (ها)
            </span>
          </div>
          {sales ? (
            sales.map((s) => (
              <div className="payment-table-row" key={s.sale_id}>
                <span className="payment-table-item date-col">
                  {new Date(s.creation_datetime).toLocaleDateString("fa-ir")}
                </span>
                <span className="payment-table-item  prod-count-col samll-font">
                  {all_users ? (
                    all_users.find(
                      (u) => u.phone_number === s.buyer_phone_number
                    ).fullname
                  ) : (
                    <LittleLoading />
                  )}
                </span>
                <span className="payment-table-item phone-number-col samll-font">
                  {s.buyer_phone_number}
                </span>
                <span className="payment-table-item price-col">
                  {split_in_three(convert_to_persian(1000000))} تومان
                </span>
                <span className="payment-table-item">
                  <button
                    onClick={() => {
                      //   set_show_prods(!show_prods);
                    }}
                    className={false ? "show-prod-btn shown" : "show-prod-btn"}
                  >
                    {!false ? "نمایش محصولات" : "بستن"}
                  </button>
                </span>

                <span className="payment-table-item share-col">
                  <button
                    onClick={() => {
                      //   set_show_prods(!show_prods);
                    }}
                    className={false ? "show-prod-btn shown" : "show-prod-btn"}
                  >
                    {!false ? "مشاهده پرداختی ها" : "بستن پرداختی ها"}
                  </button>
                </span>
              </div>
            ))
          ) : (
            <LittleLoading />
          )}
        </div>
      </div>
    </>
  );
};

export default SingleSellerSale;
