import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
const LeadFormulars = ({ lead }) => {
  const { formular, lead_packs } = useContext(DataContext);
  const lead_pack = lead_packs
    ? lead_packs.find((lp) => lp.id === lead.leadPack_id)
    : false;
  const lead_formular =
    lead_pack && formular
      ? formular.find((f) => f.id === lead_pack.formula_id)
      : false;
  return (
    <section className="porsant-wrapper">
      <div className="box-header">
        <span className="box-title">پورسانت</span>
      </div>
      <div className="porsant-kinds">
        <span className="porsant-kind">
          <span className="porsant-title">نقدی</span>
          <span className="porsant-value">
            {lead_formular ? (
              convert_to_persian(lead_formular.naghdi_percent)
            ) : (
              <LittleLoading />
            )}
          </span>
        </span>
        <span className="porsant-kind">
          <span className="porsant-title">قسطی</span>
          <span className="porsant-value">
            {lead_formular ? (
              convert_to_persian(lead_formular.ghesti_percent)
            ) : (
              <LittleLoading />
            )}
          </span>
        </span>
      </div>
    </section>
  );
};

export default LeadFormulars;
