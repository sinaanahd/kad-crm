import React, { useContext, useState } from "react";
import LittleLoading from "../../reuseables/little-loading";
import { DataContext } from "../../data/datacontext";
import ReloadBtn from "../../reuseables/reload-btn";
const Senarios = () => {
  const { senarios, get_senarios, set_senarios } = useContext(DataContext);
  const handle_reload = (e) => {
    set_senarios(false);
    get_senarios();
  };
  return (
    <section className="all-senarios-box box-style">
      <div className="box-header">
        <span className="box-title">تمامی سناریو ها</span>
        <ReloadBtn click={handle_reload} />
      </div>
      <div className="all-senarios all-wrapper">
        {senarios ? (
          senarios.map((s) => (
            <div key={s.id} className="senario-wrapper">
              <span className="senario-title">{s.scenario_name}</span>
              <p className="senario-text">{s.scenario_text}</p>
              <div className="all-btns">
                <span className="edit-btn f-btn">ویرایش</span>
                <span className="delete-btn f-btn">حذف</span>
                <span className="show-details f-btn">مشاهده جزئیات</span>
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

export default Senarios;
