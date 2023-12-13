import React, { useContext, useState } from "react";
import LittleLoading from "../../reuseables/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
import { DataContext } from "../../data/datacontext";

const FinalFactor = ({ sale, selected_user, products }) => {
  const { ref_years, ref_subjects } = useContext(DataContext);
  // const sale = {
  //   sale_id: 672,
  //   buyer_phone_number: "09351589376",
  //   seller: "غزاله صفر خانی",
  //   sale_discount_percent: 25,
  //   sale_final_price: 2900000,
  //   is_finalized: true,
  //   payments: [
  //     {
  //       payment_id: 1181,
  //       payment_amount: 1451000,
  //       payment_creation_datetime: "2023-12-12T18:22:24.221754+03:30",
  //       paying_datetime: "2023-12-13T13:10:50.532842+03:30",
  //       deadline_datetime: "2023-12-12T00:00:00+03:30",
  //       manager_confirmation: null,
  //       is_ghest: true,
  //       is_beyane: false,
  //       pay_ref_id: null,
  //       status: "پرداخت شده",
  //       products_ids: [23, 40],
  //       image: "https://kadschool.com/media/PaymentsFishImages/1181.webp",
  //     },
  //     {
  //       payment_id: 1182,
  //       payment_amount: 1451000,
  //       payment_creation_datetime: "2023-12-12T18:22:24.227181+03:30",
  //       paying_datetime: null,
  //       deadline_datetime: "2024-01-11T00:00:00+03:30",
  //       manager_confirmation: null,
  //       is_ghest: true,
  //       is_beyane: false,
  //       pay_ref_id: null,
  //       status: "نپرداخته",
  //       products_ids: [23, 40],
  //       image: null,
  //     },
  //   ],
  // };
  // const selected_user = {
  //   fullname: "سینا اناهید",
  //   phone_number: "09351589376",
  //   grade: 10,
  //   major: 1,
  //   kelases: [23, 40],
  // };
  const subject =
    selected_user && ref_subjects
      ? ref_subjects.find((s) => s.id === selected_user.major)
      : false;
  const year =
    selected_user && ref_years
      ? ref_years.find((s) => s.id === selected_user.grade)
      : false;
  const sold_prods =
    products && sale
      ? products.filter((p) =>
          sale.payments[0].products_ids.includes(p.product_id)
        )
      : false;
  return (
    <section className="final-factor-section box-style">
      <div className="section-header">
        <span className="header-title">فاکتور نهایی</span>
      </div>
      <div className="final-factor-table">
        <div className="final-factor-row final-factor-header-row">
          <span className="final-factor-item final-factor-header-item name-col">
            نام
          </span>
          <span className="final-factor-item final-factor-header-item mobile-col">
            موبایل
          </span>
          <span className="final-factor-item final-factor-header-item reshte-col">
            رشته
          </span>
          <span className="final-factor-item final-factor-header-item paye-col">
            پایه
          </span>
          <span className="final-factor-item final-factor-header-item sell-type-col">
            نوع فروش
          </span>
          <span className="final-factor-item final-factor-header-item pay-date-col">
            موعد پرداخت
          </span>
          <span className="final-factor-item final-factor-header-item prod-col">
            خرید ها
          </span>
          <span className="final-factor-item final-factor-header-item price-col">
            مبلغ کل
          </span>
          <span className="final-factor-item final-factor-header-item pay-img-col">
            عکس فیش
          </span>
        </div>
        <div className="final-factor-row">
          <span className="final-factor-item name-col">
            {selected_user ? selected_user.fullname : <LittleLoading />}
          </span>
          <span className="final-factor-item mobile-col">
            {selected_user ? selected_user.phone_number : <LittleLoading />}
          </span>
          <span className="final-factor-item  reshte-col">
            {subject ? subject.name : <LittleLoading />}
          </span>
          <span className="final-factor-item paye-col">
            {year ? year.name : <LittleLoading />}
          </span>
          <span className="final-factor-item sell-type-col">
            {sale ? (
              sale.payments[0].is_beyane ? (
                "بیعانه"
              ) : sale.payments[0].is_ghest ? (
                "قسطی"
              ) : (
                "نقدی"
              )
            ) : (
              <LittleLoading />
            )}
          </span>
          <span className="final-factor-item pay-date-col">
            {sale.payments.map((p, i) => (
              <span key={i++} className="inside-final-factor">
                {new Date(p.deadline_datetime).toLocaleDateString("fa-ir")}
              </span>
            ))}
          </span>
          <span className="final-factor-item prod-col">
            {sold_prods ? (
              sold_prods.map((sp) => (
                <span key={sp.product_id} className="factor-kelas-item">
                  <span className="prod-name">{sp.product_title}</span>
                  <span className="prod-price">
                    {split_in_three(convert_to_persian(sp.product_price))}
                    تومان
                  </span>
                </span>
              ))
            ) : (
              <LittleLoading />
            )}
          </span>
          <span className="final-factor-item price-col">
            {split_in_three(convert_to_persian(sale.sale_final_price))} تومان
          </span>
          <span className="final-factor-item pay-img-col">
            <span className="pay-img-wrapper-box">
              {sale ? (
                <img
                  src={sale.payments[0].image}
                  alt="عکس فیش"
                  onClick={() => {
                    window.open(sale.payments[0].image);
                  }}
                  className="cursor-need"
                />
              ) : (
                <LittleLoading />
              )}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default FinalFactor;
