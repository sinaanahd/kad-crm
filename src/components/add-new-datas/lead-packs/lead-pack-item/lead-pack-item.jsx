import React, { useContext, useState } from "react";
import LittleLoading from "../../../reuseables/little-loading";
import { DataContext } from "../../../data/datacontext";
import convert_to_persian from "../../../functions/convert-to-persian";
const LeadPackItem = ({ lp }) => {
  const { formular, sellers, lead_soursces, senarios } =
    useContext(DataContext);
  const formol = formular
    ? formular.find((f) => f.id === lp.formula_id)
    : false;
  const source = lead_soursces
    ? lead_soursces.find((ls) => ls.id === lp.source_id)
    : false;
  const seller = sellers
    ? sellers.find((s) => s.id === lp.target_seller_id)
    : false;
  const senario = senarios
    ? senarios.find((s) => s.id === lp.callScenario_id)
    : false;
  return (
    <div className="lead-pack">
      <span className="lead-pack-title">{lp.title}</span>
      <span className="data-item">
        <span className="item-title">فرمول پورسانت : </span>
        <span className="item-value">
          {formol ? formol.title : <LittleLoading />}
        </span>
      </span>
      <span className="data-item">
        <span className="item-title">منبع لید پک : </span>
        <span className="item-value">
          {source ? source.title : <LittleLoading />}
        </span>
      </span>
      <span className="data-item">
        <span className="item-title">فروشنده : </span>
        <span className="item-value">
          {seller ? seller.fullname : <LittleLoading />}
        </span>
      </span>
      <span className="data-item">
        <span className="item-title">سناریو : </span>
        <span className="item-value">
          {senario ? senario.scenario_name : <LittleLoading />}
        </span>
      </span>
    </div>
  );
};

export default LeadPackItem;
