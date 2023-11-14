import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import convert_to_persian from "../functions/convert-to-persian";
const SingleLead = () => {
  return (
    <>
      <Helmet>
        <title>لید فلان</title>
      </Helmet>
      <div className="single-lead-page mm-width">
        <div className="box-header">
          <span className="box-title">جزئیات لید ۰۹۱۲۳۴۵۶۷۸۹</span>
          <span className="submit-sale">ثبت فروش</span>
        </div>
        <div className="main-columns">
          <div className="lead-details-senario-wrapper">
            <section className="lead-datas">
              <div className="box-header">
                <span className="box-title">اطلاعات شخصی دانش آموز</span>
              </div>
              <span className="input-wrapper">
                <span className="input-title">اسم</span>
                <span className="input-box">
                  <input type="text" />
                </span>
              </span>
              <span className="input-wrapper">
                <span className="input-title">پایه</span>
                <span className="input-box">
                  <input type="text" />
                </span>
              </span>
              <span className="input-wrapper">
                <span className="input-title">رشته</span>
                <span className="input-box">
                  <input type="text" />
                </span>
              </span>
              <span className="input-wrapper">
                <span className="input-title">شهر</span>
                <span className="input-box">
                  <input type="text" />
                </span>
              </span>
              <span className="input-wrapper">
                <span className="input-title">شماره پدر</span>
                <span className="input-box">
                  <input type="number" />
                </span>
              </span>
              <span className="input-wrapper">
                <span className="input-title">شماره مادر</span>
                <span className="input-box">
                  <input type="number" />
                </span>
              </span>
              <span className="input-wrapper">
                <span className="input-title">شماره ثابت</span>
                <span className="input-box">
                  <input type="number" />
                </span>
              </span>
              <span className="input-wrapper">
                <span className="input-title"></span>
                <span className="input-box">
                  <span className="submit-data-changes">ثبت تغییرات</span>
                </span>
              </span>
            </section>
            <section className="senario-wrapper">
              <div className="box-header">
                <span className="box-title">سناریو</span>
              </div>
              <p className="senario-text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </section>
          </div>
          <div className="porsant-call-history">
            <section className="porsant-wrapper">
              <div className="box-header">
                <span className="box-title">پروسانت</span>
              </div>
              <div className="porsant-kinds">
                <span className="porsant-kind">
                  <span className="porsant-title">نقدی</span>
                  <span className="porsant-value">
                    {convert_to_persian(10)}
                  </span>
                </span>
                <span className="porsant-kind">
                  <span className="porsant-title">قسطی</span>
                  <span className="porsant-value">{convert_to_persian(5)}</span>
                </span>
              </div>
            </section>
            <section className="call-history">
              <div className="box-header">
                <span className="box-title">اطلاعات تماس</span>
              </div>
              <div className="call-count">
                <span className="call-count-title">تعداد تماس</span>
                <span className="call-count-value">
                  {convert_to_persian(2)}
                </span>
              </div>
              <div className="call-results">
                <div className="call-title">نتیجه تماس</div>
                <div className="call-result">
                  <span className="date-select-box-wrapper">
                    <span className="call-date">۱۳ آبان ۱۴۰۲</span>
                    <span className="call-input-wrapper">
                      <span className="select-input">انتخاب وضعیت</span>
                    </span>
                  </span>
                  <span className="call-inputs-or-result">
                    <span className="call-note-title">یادداشت</span>
                    <span className="text-area-part">
                      {/* <textarea
                        name="note-1"
                        id="note-1"
                        placeholder="نوشتن یادداشت"
                      ></textarea> */}
                      <p className="note-result">
                        یادم باشه درباره میزان تخفیف برای کلاس فسلفه و منطق
                        سوالات بیشتری بکنم
                        <br />
                        در ضمن هنوز دو دل به خرید برای ۳ تا دوره همزمان هست
                      </p>
                    </span>
                  </span>
                </div>
                <div className="call-result">
                  <span className="date-select-box-wrapper">
                    <span className="call-date">۱۳ آبان ۱۴۰۲</span>
                    <span className="call-input-wrapper">
                      <span className="select-input">انتخاب وضعیت</span>
                    </span>
                  </span>
                  <span className="call-inputs-or-result">
                    <span className="call-note-title">یادداشت</span>
                    <span className="text-area-part">
                      {/* <textarea
                        name="note-1"
                        id="note-1"
                        placeholder="نوشتن یادداشت"
                      ></textarea> */}
                      <p className="note-result">
                        یادم باشه درباره میزان تخفیف برای کلاس فسلفه و منطق
                        سوالات بیشتری بکنم
                        <br />
                        در ضمن هنوز دو دل به خرید برای ۳ تا دوره همزمان هست
                      </p>
                    </span>
                  </span>
                </div>
                <div className="call-result">
                  <span className="date-select-box-wrapper">
                    <span className="call-date">۱۳ آبان ۱۴۰۲</span>
                    <span className="call-input-wrapper">
                      <span className="select-input">انتخاب وضعیت</span>
                    </span>
                  </span>
                  <span className="call-inputs-or-result">
                    <span className="call-note-title">یادداشت</span>
                    <span className="text-area-part">
                      {/* <textarea
                        name="note-1"
                        id="note-1"
                        placeholder="نوشتن یادداشت"
                      ></textarea> */}
                      <p className="note-result">
                        یادم باشه درباره میزان تخفیف برای کلاس فسلفه و منطق
                        سوالات بیشتری بکنم
                        <br />
                        در ضمن هنوز دو دل به خرید برای ۳ تا دوره همزمان هست
                      </p>
                    </span>
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleLead;
