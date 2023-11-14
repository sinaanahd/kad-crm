import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import convert_to_persian from "../functions/convert-to-persian";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const LeadsPage = () => {
  return (
    <>
      <Helmet>
        <title>لیدهای من</title>
      </Helmet>
      <div className="leads-page">
        <div className="first-row mm-width">
          <section className="summary-status">
            <div className="box-header">
              <span className="box-title">خلاصه وضعیت</span>
            </div>
            <div className="numerical-datas">
              <span className="numerical-wrapper">
                <span className="numerical-title">تعداد کل شماره ها :</span>
                <span className="numerical-number">
                  {convert_to_persian(1290)}
                </span>
              </span>
              <span className="numerical-wrapper">
                <span className="numerical-title">حداقل یک تماس :</span>
                <span className="numerical-number">
                  {convert_to_persian(1290)}
                </span>
              </span>
              <span className="numerical-wrapper">
                <span className="numerical-title">بدون تماس :</span>
                <span className="numerical-number">
                  {convert_to_persian(1290)}
                </span>
              </span>
            </div>
          </section>
        </div>
        <section className="numbers-tabale-wrapper mm-width">
          <div className="box-header">
            <span className="box-title">لیدپک های من</span>
            <span className="search-item">
              <input type="text" placeholder="جستجو شماره" />
            </span>
          </div>
          <div className="number-table">
            <div className="number-header-row number-row">
              <span className="header-item number-item first-item">شماره</span>
              <span className="header-item number-item">تعداد تماس</span>
              <span className="header-item number-item">پایه</span>
              <span className="header-item number-item">رشته</span>
              <span className="header-item number-item">پورسانت</span>
              <span className="header-item number-item date-item">تاریخ</span>
              <span className="header-item number-item last-item"></span>
            </div>
            <div className="number-row">
              <span className="number-item first-item">۰۹۱۲۳۴۵۶۷۸۹</span>
              <span className="number-item">{convert_to_persian(3)}</span>
              <span className="number-item">دوازدهم</span>
              <span className="number-item">انسانی</span>
              <span className="number-item">۵۰٪</span>
              <span className="number-item date-item">۱۲ شهریور ۱۴۰۲</span>
              <span className="number-item last-item">
                <Link to={"lead/:id"} className="go-to-lead-page">
                  جزئیات لید
                </Link>
              </span>
            </div>
            <div className="number-row">
              <span className="number-item first-item">۰۹۱۲۳۴۵۶۷۸۹</span>
              <span className="number-item">{convert_to_persian(3)}</span>
              <span className="number-item">دوازدهم</span>
              <span className="number-item">انسانی</span>
              <span className="number-item">۵۰٪</span>
              <span className="number-item date-item">۱۲ شهریور ۱۴۰۲</span>
              <span className="number-item last-item">
                <Link to={"lead/:id"} className="go-to-lead-page">
                  جزئیات لید
                </Link>
              </span>
            </div>
            <div className="number-row">
              <span className="number-item first-item">۰۹۱۲۳۴۵۶۷۸۹</span>
              <span className="number-item">{convert_to_persian(3)}</span>
              <span className="number-item">دوازدهم</span>
              <span className="number-item">انسانی</span>
              <span className="number-item">۵۰٪</span>
              <span className="number-item date-item">۱۲ شهریور ۱۴۰۲</span>
              <span className="number-item last-item">
                <Link to={"lead/:id"} className="go-to-lead-page">
                  جزئیات لید
                </Link>
              </span>
            </div>
            <div className="number-row">
              <span className="number-item first-item">۰۹۱۲۳۴۵۶۷۸۹</span>
              <span className="number-item">{convert_to_persian(3)}</span>
              <span className="number-item">دوازدهم</span>
              <span className="number-item">انسانی</span>
              <span className="number-item">۵۰٪</span>
              <span className="number-item date-item">۱۲ شهریور ۱۴۰۲</span>
              <span className="number-item last-item">
                <Link to={"lead/:id"} className="go-to-lead-page">
                  جزئیات لید
                </Link>
              </span>
            </div>
            <div className="number-row">
              <span className="number-item first-item">۰۹۱۲۳۴۵۶۷۸۹</span>
              <span className="number-item">{convert_to_persian(3)}</span>
              <span className="number-item">دوازدهم</span>
              <span className="number-item">انسانی</span>
              <span className="number-item">۵۰٪</span>
              <span className="number-item date-item">۱۲ شهریور ۱۴۰۲</span>
              <span className="number-item last-item">
                <Link to={"lead/:id"} className="go-to-lead-page">
                  جزئیات لید
                </Link>
              </span>
            </div>
            <div className="number-row">
              <span className="number-item first-item">۰۹۱۲۳۴۵۶۷۸۹</span>
              <span className="number-item">{convert_to_persian(3)}</span>
              <span className="number-item">دوازدهم</span>
              <span className="number-item">انسانی</span>
              <span className="number-item">۵۰٪</span>
              <span className="number-item date-item">۱۲ شهریور ۱۴۰۲</span>
              <span className="number-item last-item">
                <Link to={"lead/:id"} className="go-to-lead-page">
                  جزئیات لید
                </Link>
              </span>
            </div>
            <div className="number-row">
              <span className="number-item first-item">۰۹۱۲۳۴۵۶۷۸۹</span>
              <span className="number-item">{convert_to_persian(3)}</span>
              <span className="number-item">دوازدهم</span>
              <span className="number-item">انسانی</span>
              <span className="number-item">۵۰٪</span>
              <span className="number-item date-item">۱۲ شهریور ۱۴۰۲</span>
              <span className="number-item last-item">
                <Link to={"lead/:id"} className="go-to-lead-page">
                  جزئیات لید
                </Link>
              </span>
            </div>
            <div className="number-row">
              <span className="number-item first-item">۰۹۱۲۳۴۵۶۷۸۹</span>
              <span className="number-item">{convert_to_persian(3)}</span>
              <span className="number-item">دوازدهم</span>
              <span className="number-item">انسانی</span>
              <span className="number-item">۵۰٪</span>
              <span className="number-item date-item">۱۲ شهریور ۱۴۰۲</span>
              <span className="number-item last-item">
                <Link to={"lead/:id"} className="go-to-lead-page">
                  جزئیات لید
                </Link>
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LeadsPage;
