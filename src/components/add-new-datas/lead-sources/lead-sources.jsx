import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
import ReloadBtn from "../../reuseables/reload-btn";
const LeadSources = () => {
  const { lead_soursces, get_lead_sources, set_lead_soursces } =
    useContext(DataContext);
  const handle_reload = () => {
    set_lead_soursces(false);
    get_lead_sources();
  };
  return (
    <section className="box-style lead-sources-box">
      <div className="box-header">
        <span className="box-title">تمامی لید سورس ها</span>
        <ReloadBtn click={handle_reload} />
      </div>
      <div className="all-lead-sources all-wrapper">
        {lead_soursces ? (
          lead_soursces.map((ls) => (
            <div key={ls.id} className="lead-source">
              <span className="lead-source-title">{ls.title}</span>
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

export default LeadSources;
