import React, { useContext, useEffect, useState } from "react";
import magnifier from "../../../asset/images/leads/magnifier.svg";
import arrow from "../../../asset/images/make-lead/arrow-up.svg";
import convert_to_persian from "../../functions/convert-to-persian";
import axios from "axios";
import urls from "../../../urls/url";
import LittleLoading from "../../reuseables/little-loading";
import split_in_three from "../../functions/spilit_in_three";
import find_month from "../../functions/find-month";
import Product from "./product/product";
import CartProduct from "./cart-products/cart-product";
import { DataContext } from "../../data/datacontext";

const SaleData = ({ selected_user, set_sale, set_products, products }) => {
  const { user, lead_soursces } = useContext(DataContext);
  const [cart, set_cart] = useState(false);
  const [percent, set_percent] = useState(0);
  const [open_select, set_open_select] = useState(false);
  const [slice_num, set_slice_num] = useState(0);
  const [searched_products, set_searched_products] = useState(false);
  const [sale_conditions, set_sale_conditions] = useState(false);
  const [sale_kind, set_sale_kind] = useState(false);
  const [ghest_count, set_ghest_count] = useState(0);
  const [day, set_day] = useState(false);
  const [month, set_month] = useState(false);
  const [year, set_year] = useState(false);
  const [beyane_amount, set_beyane_amount] = useState(false);
  const [pause, set_pause] = useState(false);
  const [sale_chanel, set_sale_chanel] = useState(false);
  const [disable_part, set_disable_part] = useState(false);
  useEffect(() => {
    // check_past_dates();
    axios
      .get(urls.products)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          set_products(response);
          localStorage.setItem("all-products", JSON.stringify(response));
          // set_cart(response.slice(0, 5));
        } else {
          alert("مشکلی پیش آمده");
          console.log(error);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی پیش آمده");
      });
  }, []);
  const handle_sale_chanel = (entry) => {
    set_sale_chanel(entry);
    set_open_select(false);
  };
  const handle_percent = (e) => {
    // console.log(e.target.value);
    const value = e.target.value;
    set_percent(value);
    // console.log(value);
  };
  const handle_open_select = (entry) => {
    if (entry === open_select) {
      set_open_select(false);
    } else {
      set_open_select(entry);
    }
  };
  const make_pagination = () => {
    const number = Math.ceil(products.length / 10);
    const pagination_count = [];
    for (let i = 1; i <= number; i++) {
      pagination_count.push(i);
    }
    return pagination_count;
  };
  const handle_search = (e) => {
    const value = e.target.value;
    let searched = false;
    if (products) {
      if (value.length === 0) {
        searched = false;
      } else if (value.length > 2) {
        searched = products.filter((p) => p.product_title.includes(value));
      }
    }
    set_searched_products(searched);
  };
  const handle_cart = (p) => {
    const sample_cart = !cart
      ? {
          products_ids: [],
          products: [],
          total_price: 0,
        }
      : { ...cart };
    if (!sample_cart.products_ids.includes(p.product_id)) {
      sample_cart.products.push(p);
    } else {
      const index = sample_cart.products.findIndex(
        (i) => p.product_id === i.product_id
      );
      sample_cart.products.splice(index, 1);
    }
    sample_cart.products_ids = sample_cart.products.map((p) => p.product_id);
    let sum = 0;
    sample_cart.products.forEach((p) => {
      sum += p.product_price;
    });
    sample_cart.total_price = sum;
    if (sample_cart.products.length !== 0) {
      set_cart(sample_cart);
    } else {
      set_cart(false);
    }
  };
  const check_user_kelas = (id) => {
    return selected_user.kelases.includes(id);
  };
  const handle_sale_condition = (entry) => {
    set_open_select(false);
    set_sale_conditions(entry);
  };
  const handle_sale_kind = (entry) => {
    set_open_select(false);
    set_sale_kind(entry);
  };
  const handle_ghest_count = (entry) => {
    set_open_select(false);
    set_ghest_count(entry);
  };
  const make_days = (e) => {
    const days = [];
    for (let i = 1; i < 32; i++) {
      days.push(i);
    }
    return days;
  };
  const handle_day = (entry) => {
    set_day(entry);
    set_open_select(false);
  };
  const handle_month = (entry) => {
    set_month(entry);
    set_open_select(false);
  };
  const handle_year = (entry) => {
    set_year(entry);
    set_open_select(false);
  };
  const handle_beyane_amount = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      set_beyane_amount(value);
    } else {
      set_beyane_amount(false);
    }
  };
  const handle_data_check = () => {
    let send_obj = false;
    if (sale_kind) {
      if (
        cart &&
        (percent || percent === 0) &&
        sale_conditions &&
        sale_chanel
      ) {
        if (sale_kind !== "beyane") {
          if (ghest_count !== 0 && sale_kind === "ghesti") {
            send_obj = {
              source: sale_chanel,
              has_beyane: false,
              buyer_phone_number: selected_user.phone_number,
              staff_id: user.id,
              discount_percent: percent ? parseInt(percent) : null,
              final_price: cart.total_price,
              special_conditions: sale_conditions === "normal" ? false : true,
              products_ids: cart.products_ids,
              ghests_count: ghest_count,
            };
          } else if (ghest_count === 0 && sale_kind === "ghesti") {
            alert_err();
          } else {
            send_obj = {
              source: sale_chanel,
              has_beyane: false,
              buyer_phone_number: selected_user.phone_number,
              staff_id: user.id,
              discount_percent: percent ? parseInt(percent) : null,
              final_price: cart.total_price,
              special_conditions: sale_conditions === "normal" ? false : true,
              products_ids: cart.products_ids,
              ghests_count: 0,
            };
          }
        } else {
          if (beyane_amount && day && month && year) {
            if (beyane_amount >= cart.total_price) {
              alert("مبلغ بیعانه بیشتر از قیمت کل است");
            } else if (month > 6 && day === 31) {
              alert("ماه انتخابی حداکثر ۳۰ روز دارد");
            } else if (check_past_dates()) {
              send_obj = {
                source: sale_chanel,
                has_beyane: true,
                buyer_phone_number: selected_user.phone_number,
                staff_id: user.id,
                discount_percent: percent ? parseInt(percent) : null,
                final_price: cart.total_price,
                special_conditions: sale_conditions === "normal" ? false : true,
                products_ids: cart.products_ids,
                beyane_amount: parseInt(beyane_amount),
                deadline: [year, month, day],
              };
            }
          } else {
            alert_err();
          }
        }
      } else {
        alert_err();
      }
    } else {
      alert_err();
    }
    // console.log(send_obj);
    if (send_obj) {
      send_data(send_obj);
    }
  };
  const alert_err = () => {
    alert("اطلاعات به درستی وارد نشده است");
  };
  const send_data = (send_obj) => {
    set_pause(true);
    axios
      .post(urls.sale, send_obj)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          set_sale(response);
          set_disable_part(true);
        } else {
          alert("مشکلی پیش آمده");
          console.log(error);
        }
        set_pause(false);
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی پیش آمده");
        set_pause(false);
      });
  };
  const check_past_dates = () => {
    const today = new Date().toLocaleDateString("fa-ir");
    let result = false;
    const err_msg = "تاریخ وارد شده گذشته";
    const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const today_year = parseInt(p2e(today.split(["/"])[0]));
    const today_month = parseInt(p2e(today.split(["/"])[1]));
    const today_day = parseInt(p2e(today.split(["/"])[2]));
    if (year < today_year) {
      alert(err_msg);
    } else if (year === today_year && month < today_month) {
      alert(err_msg);
    } else if (
      year === today_year &&
      month === today_month &&
      day < today_day
    ) {
      alert(err_msg);
    } else {
      result = true;
    }
    return result;
  };
  return (
    <section
      className={
        disable_part
          ? "sale-details-wrapper disabled-part"
          : "sale-details-wrapper"
      }
    >
      <div className="box-style shop-col">
        <div className="section-header">
          <span className="header-title">همه محصولات </span>
          <span className="header-input-place">
            <img src={magnifier} alt="جستجو" />
            <input
              type="text"
              placeholder="جستجوی محصول"
              onInput={handle_search}
            />
          </span>
        </div>
        <div className="products-wrapper">
          {products ? (
            searched_products ? (
              searched_products.length !== 0 ? (
                searched_products.map((p) => (
                  <Product
                    cart={cart}
                    p={p}
                    key={p.product_id}
                    handle_cart={handle_cart}
                    check_user_kelas={check_user_kelas}
                  />
                ))
              ) : (
                "موردی برای نمایش وجود ندارد"
              )
            ) : (
              products
                .slice(slice_num * 10, slice_num * 10 + 10)
                .map((p) => (
                  <Product
                    cart={cart}
                    p={p}
                    key={p.product_id}
                    handle_cart={handle_cart}
                    check_user_kelas={check_user_kelas}
                  />
                ))
            )
          ) : (
            <LittleLoading />
          )}
        </div>
        {!searched_products ? (
          <div className="paginiation-wrapper">
            <span className="arrow-span next-span">
              <img src={arrow} alt="بعدی" />
            </span>
            <span className="pagination-numbers">
              {products ? (
                make_pagination().map((pc) => (
                  <span
                    key={pc}
                    className={
                      pc === slice_num + 1
                        ? "pagination-number active"
                        : "pagination-number"
                    }
                    onClick={() => {
                      set_slice_num(pc - 1);
                    }}
                  >
                    {convert_to_persian(pc)}
                  </span>
                ))
              ) : (
                <LittleLoading />
              )}
            </span>
            <span className="arrow-span">
              <img src={arrow} alt="قبلی" />
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="cart-col box-style">
        <div className="section-header">
          <span className="header-title">محصولات انتخاب شده</span>
        </div>
        <div className="cart-items">
          {cart
            ? cart.products.map((p) => (
                <CartProduct
                  key={p.product_id}
                  handle_cart={handle_cart}
                  p={p}
                />
              ))
            : "محصولی انتخاب نشده است"}
        </div>
        <div className="total-price-wrapper">
          <span className="total-price-label">قیمت کل</span>
          <span className="total-price-num">
            {cart
              ? split_in_three(convert_to_persian(cart.total_price))
              : convert_to_persian(0)}{" "}
            تومان
          </span>
        </div>
        <span className="sale-input-wrapper discount-wrapper">
          <span className="sale-input-label">درصد تخفیف</span>
          <span className="input-label-span discount-input-span">
            <input
              type="range"
              step={5}
              max={100}
              min={0}
              onInput={handle_percent}
            />
            <span className="min-max-values">
              <span className="min-value">{convert_to_persian(0)}</span>
              <span className="choosen-percent">
                <font>%</font>{" "}
                {convert_to_persian(percent) || convert_to_persian(0)}{" "}
              </span>
              <span className="max-value">{convert_to_persian(100)}</span>
            </span>
          </span>
        </span>
        <div className="custom-select-boxes-part">
          <div className="input-wrapper">
            <span className="input-label">کانال فروش</span>
            <span className="input-span">
              <span
                className="custom-select-box"
                onClick={() => {
                  handle_open_select("sale_chanel");
                }}
              >
                <span className="custom-select-box-text">
                  {sale_chanel ? sale_chanel : "انتخاب کنید"}
                </span>
                <img src={arrow} alt="بازکردن" />
              </span>
              {open_select === "sale_chanel" ? (
                <span className="select-box-options">
                  {lead_soursces ? (
                    lead_soursces.map((ls) => (
                      <span
                        key={ls.id}
                        className="select-option"
                        onClick={() => {
                          handle_sale_chanel(ls.title);
                        }}
                      >
                        {ls.title}
                      </span>
                    ))
                  ) : (
                    <LittleLoading />
                  )}
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>
          <div className="input-wrapper">
            <span className="input-label">شرایط فروش</span>
            <span className="input-span">
              <span
                className="custom-select-box"
                onClick={() => {
                  handle_open_select("pay_conditions");
                }}
              >
                <span className="custom-select-box-text">
                  {sale_conditions
                    ? sale_conditions === "normal"
                      ? "عادی"
                      : "خاص"
                    : "انتخاب کنید"}
                </span>
                <img src={arrow} alt="بازکردن" />
              </span>
              {open_select === "pay_conditions" ? (
                <span className="select-box-options">
                  <span
                    className="select-option"
                    onClick={() => {
                      handle_sale_condition("normal");
                    }}
                  >
                    عادی
                  </span>
                  <span
                    className="select-option"
                    onClick={() => {
                      handle_sale_condition("special");
                    }}
                  >
                    خاص
                  </span>
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>
          <div className="input-wrapper">
            <span className="input-label">نوع فروش</span>
            <span className="input-span">
              <span
                className="custom-select-box"
                onClick={() => {
                  handle_open_select("pay_type");
                }}
              >
                <span className="custom-select-box-text">
                  {sale_kind
                    ? sale_kind === "ghesti"
                      ? "قسطی"
                      : sale_kind === "naghdi"
                      ? "نقدی"
                      : "بیعانه"
                    : "انتخاب کنید"}
                </span>
                <img src={arrow} alt="بازکردن" />
              </span>
              {open_select === "pay_type" ? (
                <span className="select-box-options">
                  <span
                    onClick={() => {
                      handle_sale_kind("ghesti");
                    }}
                    className="select-option"
                  >
                    قسطی
                  </span>
                  <span
                    onClick={() => {
                      handle_sale_kind("naghdi");
                    }}
                    className="select-option"
                  >
                    نقدی
                  </span>
                  <span
                    onClick={() => {
                      handle_sale_kind("beyane");
                    }}
                    className="select-option"
                  >
                    بیعانه
                  </span>
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>
          {sale_kind === "ghesti" ? (
            <div className="input-wrapper">
              <span className="input-label">تعداد قسط</span>
              <span className="input-span">
                <span
                  className="custom-select-box"
                  onClick={() => {
                    handle_open_select("ghest");
                  }}
                >
                  <span className="custom-select-box-text">
                    {ghest_count
                      ? `${convert_to_persian(ghest_count)} قسط`
                      : "انتخاب کنید"}
                  </span>
                  <img src={arrow} alt="بازکردن" />
                </span>
                {open_select === "ghest" ? (
                  <span className="select-box-options">
                    <span
                      className="select-option"
                      onClick={() => {
                        handle_ghest_count(2);
                      }}
                    >
                      ۲ قسط
                    </span>
                    <span
                      className="select-option"
                      onClick={() => {
                        handle_ghest_count(3);
                      }}
                    >
                      ۳ قسط
                    </span>
                  </span>
                ) : (
                  <></>
                )}
              </span>
            </div>
          ) : (
            <></>
          )}
          {sale_kind === "beyane" ? (
            <>
              <div className="input-wrapper pos-need">
                <span className="input-label">مبلغ بیعانه</span>
                <input
                  type="number"
                  placeholder="مبلغ بیعانه را وارد کنید"
                  className="beyane-input"
                  onInput={handle_beyane_amount}
                />
                {beyane_amount ? (
                  <span className="num-extra-show">
                    {split_in_three(convert_to_persian(beyane_amount))} تومان
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div className="input-wrapper date-input">
                <span className="input-label">مهلت تسویه</span>
                <div className="custom-date-picker-wrapper">
                  <span className="custom-date-wrapper">
                    <span
                      className="custom-date-box"
                      onClick={() => {
                        handle_open_select("day");
                      }}
                    >
                      <span className="custom-date-box-title">
                        {day ? convert_to_persian(day) : "روز"}
                      </span>
                      <img src={arrow} alt="بازکردن" />
                    </span>
                    {open_select === "day" ? (
                      <span className="custom-date-select-options date-custom">
                        {make_days().map((d) => (
                          <span
                            key={d}
                            className="custom-date-option"
                            onClick={() => {
                              handle_day(d);
                            }}
                          >
                            {convert_to_persian(d)}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <></>
                    )}
                  </span>
                  <span className="custom-date-wrapper">
                    <span
                      className="custom-date-box month-custom-box"
                      onClick={() => {
                        handle_open_select("month");
                      }}
                    >
                      <span className="custom-date-box-title">
                        {month ? find_month(month) : "ماه"}
                      </span>
                      <img src={arrow} alt="بازکردن" />
                    </span>
                    {open_select === "month" ? (
                      <span className="custom-date-select-options month-select-box">
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(1);
                          }}
                        >
                          فروردین
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(2);
                          }}
                        >
                          اردیبهشت
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(3);
                          }}
                        >
                          خرداد
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(4);
                          }}
                        >
                          تیر
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(5);
                          }}
                        >
                          مرداد
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(6);
                          }}
                        >
                          شهریور
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(7);
                          }}
                        >
                          مهر
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(8);
                          }}
                        >
                          آبان
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(9);
                          }}
                        >
                          آذر
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(10);
                          }}
                        >
                          دی
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(11);
                          }}
                        >
                          بهمن
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_month(12);
                          }}
                        >
                          اسفند
                        </span>
                      </span>
                    ) : (
                      <></>
                    )}
                  </span>
                  <span className="custom-date-wrapper">
                    <span
                      className="custom-date-box"
                      onClick={() => {
                        handle_open_select("year");
                      }}
                    >
                      <span className="custom-date-box-title">
                        {year ? convert_to_persian(year) : "سال"}
                      </span>
                      <img src={arrow} alt="بازکردن" />
                    </span>
                    {open_select === "year" ? (
                      <span className="custom-date-select-options">
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_year(1402);
                          }}
                        >
                          ۱۴۰۲
                        </span>
                        <span
                          className="custom-date-option"
                          onClick={() => {
                            handle_year(1403);
                          }}
                        >
                          ۱۴۰۳
                        </span>
                      </span>
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {pause ? (
          <button className="submit-btn">
            <LittleLoading />
          </button>
        ) : (
          <button className="submit-btn" onClick={handle_data_check}>
            ثبت اطلاعات
          </button>
        )}
      </div>
    </section>
  );
};

export default SaleData;
