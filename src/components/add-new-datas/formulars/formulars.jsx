import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
import ReloadBtn from "../../reuseables/reload-btn";
const Formulars = () => {
  const { formular, get_formulars, set_formular } = useContext(DataContext);
  const handle_reload = () => {
    set_formular(false);
    get_formulars();
  };
  return (
    <section className="formulars-box box-style">
      <div className="box-header">
        <span className="box-title">تمامی فرمول های پورسانت</span>
        <ReloadBtn click={handle_reload} />
      </div>
      <div className="all-formulars all-wrapper">
        {formular ? (
          formular.map((f, i) => (
            <div key={i++} className="formular">
              <span className="formular-data-box">
                <span className="formular-data-title">درصد نقدی</span>
                <span className="formular-data-num">
                  {convert_to_persian(f.naghdi_percent)}
                </span>
              </span>
              <span className="formular-data-box">
                <span className="formular-data-title">درصد قسطی</span>
                <span className="formular-data-num">
                  {convert_to_persian(f.ghesti_percent)}
                </span>
              </span>
              <div className="all-btns">
                <span className="edit-btn f-btn">ویرایش</span>
                <span className="delete-btn f-btn">حذف</span>
              </div>
            </div>
          ))
        ) : (
          <LittleLoading />
        )}
      </div>
    </section>
  );
};

export default Formulars;
