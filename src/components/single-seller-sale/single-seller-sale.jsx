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
import Sale from "./sale/sale";
const SingleSellerSale = () => {
  const { user, all_users } = useContext(DataContext);
  const page_slug = window.location.pathname.split("/")[2];
  const [sales, set_sales] = useState(false);
  const [searched_sales, set_searched_sales] = useState(false);
  const year = convert_to_persian(parseInt(page_slug.split("-")[2]));
  const month = find_month(parseInt(page_slug.split("-")[1]));

  useEffect(() => {
    get_month_report();
  }, []);
  const handle_relaod = () => {
    set_sales(false);
    get_month_report();
  };
  const get_month_report = (e) => {
    axios
      .get(
        `${urls.staff_sales_report_single_month}${user.id}-${parseInt(
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
  const handle_search = (e) => {
    const value = e.target.value;
    if (value.length > 3 && sales) {
      const searched = sales.filter((s) =>
        s.buyer_phone_number.startsWith(value)
      );
      set_searched_sales(searched);
    } else {
      set_searched_sales(false);
    }
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
          <input
            type="number"
            placeholder="جستجوی شماره"
            onInput={handle_search}
          />
          <ReloadBtn click={handle_relaod} />
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
            searched_sales ? (
              searched_sales.length !== 0 ? (
                searched_sales.map((s) => (
                  <Sale
                    s={s}
                    key={s.sale_id}
                    sales={sales}
                    set_sales={set_sales}
                  />
                ))
              ) : (
                "موردی برای نمایش وجود ندارد"
              )
            ) : (
              sales.map((s) => (
                <Sale
                  s={s}
                  key={s.sale_id}
                  sales={sales}
                  set_sales={set_sales}
                />
              ))
            )
          ) : (
            <LittleLoading />
          )}
        </div>
      </div>
    </>
  );
};

export default SingleSellerSale;
