import React, { useState } from "react";
import LittleLoading from "../../reuseables/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";

const FinalFactor = () => {
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
          <span className="final-factor-item name-col">پارسا سراِییه</span>
          <span className="final-factor-item mobile-col">09351589376</span>
          <span className="final-factor-item  reshte-col">انسانی</span>
          <span className="final-factor-item paye-col">دوازدهم</span>
          <span className="final-factor-item sell-type-col">قسطی</span>
          <span className="final-factor-item pay-date-col">۱۱ مهر ۱۴۰۰</span>
          <span className="final-factor-item prod-col">
            <span className="factor-kelas-item">
              <span className="prod-name">علوم و فنون هامون سبطی</span>
              <span className="prod-price">
                {split_in_three(convert_to_persian(100000))}
                تومان
              </span>
            </span>
            <span className="factor-kelas-item">
              <span className="prod-name">علوم و فنون هامون سبطی</span>
              <span className="prod-price">
                {split_in_three(convert_to_persian(100000))}
                تومان
              </span>
            </span>
            <span className="factor-kelas-item">
              <span className="prod-name">علوم و فنون هامون سبطی</span>
              <span className="prod-price">
                {split_in_three(convert_to_persian(100000))}
                تومان
              </span>
            </span>
          </span>
          <span className="final-factor-item price-col">
            {split_in_three(convert_to_persian(1000000000))} تومان
          </span>
          <span className="final-factor-item pay-img-col">
            <span className="pay-img-wrapper-box">
              <img src="" alt="عکس فیش" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default FinalFactor;
