import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import convert_to_persian from "../functions/convert-to-persian";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import arrow_img from "../../asset/images/leads/arrow-up.svg";
import magnifier from "../../asset/images/leads/magnifier.svg";
import LittleLoading from "../reuseables/little-loading";
import axios from "axios";
import urls from "../../urls/url";
import Lead from "./lead/lead";
import ReloadBtn from "../reuseables/reload-btn";

const pack_data = JSON.parse(localStorage.getItem("pack-data")) || false;
// const pack_data = false;
const leads_data = JSON.parse(localStorage.getItem("leads-data")) || false;

const LeadsPage = () => {
  const {
    lead_packs,
    seller_lead_pcaks,
    get_lead_packs,
    set_seller_lead_pcaks,
    get_seller_lead_packs,
    set_lead_packs,
  } = useContext(DataContext);
  const [show_lead_packs, set_show_lead_packs] = useState(false);
  const [lead_pack, set_lead_pack] = useState(pack_data);
  const [leads, set_leads] = useState(false);
  const [filtered_leads, set_filtered_leads] = useState(false);
  // const [lp_load, set_lp_load] = useState(leads_data);
  const my_seller_lead_packs =
    seller_lead_pcaks && lead_packs
      ? lead_packs.filter((lp) => seller_lead_pcaks.includes(lp.id))
      : false;
  useEffect(() => {
    // get_lead_packs();
  });

  useEffect(() => {
    get_lead_pack();
  }, [lead_pack]);
  const get_lead_pack = () => {
    if (lead_pack) {
      localStorage.setItem("pack-data", JSON.stringify(lead_pack));
      set_leads(false);
      axios
        .get(`${urls.single_lead_pack}${lead_pack.id}`)
        .then((res) => {
          const { error, response, result } = res.data;
          if (result) {
            set_leads(response);
            console.log(response);
            localStorage.setItem("leads-data", JSON.stringify(response));
          } else {
            alert("مشکلی پیش آمده");
            console.log(error);
          }
        })
        .catch((e) => console.log(e.massage));
    }
  };
  useEffect(() => {
    get_sellers_lead_pack();
  }, [seller_lead_pcaks]);
  const get_sellers_lead_pack = (e) => {
    if (!lead_pack && seller_lead_pcaks && lead_packs) {
      if (seller_lead_pcaks.length !== 0) {
        const inside_lead_pack = lead_packs.find((lp) =>
          seller_lead_pcaks.includes(lp.id)
        );
        set_lead_pack(inside_lead_pack);
        if (inside_lead_pack) {
          localStorage.setItem("pack-data", JSON.stringify(inside_lead_pack));
          axios
            .get(`${urls.single_lead_pack}${inside_lead_pack.id}`)
            .then((res) => {
              const { error, response, result } = res.data;
              if (result) {
                set_leads(response);
                localStorage.setItem("leads-data", JSON.stringify(response));
              } else {
                alert("مشکلی پیش آمده");
                console.log(error);
              }
              // console.log(res.data);
            })
            .catch((e) => console.log(e.massage));
        }
      }
    }
  };
  const find_call_counts = (count) => {
    let counted = 0;
    leads.forEach((l) => {
      if (l.calls_count >= count) {
        counted++;
      }
    });
    return counted;
  };
  const handle_search = (e) => {
    const value = e.target.value;
    let filtered = [];
    if (value.length > 2) {
      filtered = leads.filter((l) => l.phone_number.startsWith(value));
      set_filtered_leads(filtered);
    } else {
      set_filtered_leads(false);
    }
  };
  const handle_seller_lead_packs_reload = () => {
    set_lead_packs(false);
    set_lead_pack(false);
    set_leads(false);
    set_seller_lead_pcaks(false);
    get_lead_packs();
    setTimeout(() => {
      get_seller_lead_packs();
    }, 1000);
    // setTimeout(() => {
    // }, 1000);
  };
  return (
    <>
      <Helmet>
        <title>لیدهای من</title>
      </Helmet>
      <div className="leads-page">
        <div className="first-row mm-width">
          <section className="summary-status">
            <div className="box-header">
              <span className="box-title">
                خلاصه وضعیت {lead_pack ? lead_pack.title : <LittleLoading />}
              </span>
            </div>
            <div className="numerical-datas">
              <span className="numerical-wrapper">
                <span className="numerical-title">تعداد کل شماره ها :</span>
                <span className="numerical-number">
                  {leads ? convert_to_persian(leads.length) : <LittleLoading />}
                </span>
              </span>
              <span className="numerical-wrapper">
                <span className="numerical-title">حداقل یک تماس :</span>
                <span className="numerical-number">
                  {leads ? (
                    convert_to_persian(find_call_counts(1))
                  ) : (
                    <LittleLoading />
                  )}
                </span>
              </span>
              <span className="numerical-wrapper">
                <span className="numerical-title">بدون تماس :</span>
                <span className="numerical-number">
                  {leads ? (
                    convert_to_persian(leads.length - find_call_counts(1))
                  ) : (
                    <LittleLoading />
                  )}
                </span>
              </span>
            </div>
          </section>
          <section className="filters-box-area">
            <ReloadBtn click={handle_seller_lead_packs_reload} />
            <div className="choose-lead-pack">
              <span
                className="choose-lead-pack-box"
                onClick={() => {
                  set_show_lead_packs(!show_lead_packs);
                }}
              >
                <span className="choose-text">
                  {lead_pack ? lead_pack.title : "انتخاب لید پک"}
                </span>
                <img src={arrow_img} alt="باز کردن و بسته کردن" />
              </span>
              {show_lead_packs ? (
                <div className="lead-packs-box">
                  {my_seller_lead_packs ? (
                    my_seller_lead_packs.map((lp) => (
                      <span
                        key={lp.id}
                        className="lead-pack-item"
                        onClick={() => {
                          set_lead_pack(lp);
                          set_show_lead_packs(false);
                        }}
                      >
                        {lp.title}
                      </span>
                    ))
                  ) : (
                    <LittleLoading />
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* <div className="call-counts">
              <span className="call-counts-title">
                تعداد تماس های گرفته شده
              </span>
              <span className="call-count-input">
                <input type="num" placeholder="تعداد تماس" />
              </span>
            </div> */}
            {/* <div className="pick-last-call-date">
              <span className="pick-last-title">تاریخ آخرین تماس</span>
              <span className="last-call-box">
                <span className="last-col-text">انتخاب</span>
                <img src={arrow_img} alt="" />
              </span>
            </div> */}
            {/* <button className="submit-filters">اعمال فیلتر</button> */}
          </section>
        </div>
        <section className="numbers-tabale-wrapper mm-width">
          <div className="box-header">
            <span className="box-title">لیدپک های من</span>
            <span className="search-item">
              <input
                type="number"
                placeholder="جستجو شماره"
                onInput={handle_search}
              />
              <img src={magnifier} alt="جستجو" />
            </span>
          </div>
          <div className="number-table">
            <div className="number-header-row number-row">
              <span className="header-item number-item counter-col">ردیف</span>
              <span className="header-item number-item first-item">شماره</span>
              <span className="header-item number-item">نام</span>
              <span className="header-item number-item call-counts-col">
                تعداد تماس
              </span>
              <span className="header-item number-item">پایه</span>
              <span className="header-item number-item">رشته</span>
              <span className="header-item number-item date-item">
                منبع شماره
              </span>
              <span className="header-item number-item">آخرین تماس</span>
              <span className="header-item number-item last-item"></span>
            </div>
            {leads ? (
              filtered_leads ? (
                filtered_leads.length !== 0 ? (
                  filtered_leads.map((l, i) => (
                    <Lead counter={i++} key={l.id} lead={l} pack={lead_pack} />
                  ))
                ) : (
                  "موردی برای نمایش وجود ندارد"
                )
              ) : leads.length !== 0 ? (
                leads.map((l, i) => (
                  <Lead counter={i++} key={l.id} lead={l} pack={lead_pack} />
                ))
              ) : (
                "موردی برای نمایش وجود ندارد"
              )
            ) : (
              <LittleLoading />
            )}

            {/* <div className="number-row">
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
            </div> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default LeadsPage;
