import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
const LeadSenario = ({ lead }) => {
  const { senarios, lead_packs } = useContext(DataContext);
  const lead_pack = lead_packs
    ? lead_packs.find((lp) => lp.id === lead.leadPack_id)
    : false;
  const senario =
    senarios && lead_pack
      ? senarios.find((s) => s.id === lead_pack.callScenario_id)
      : false;
  return (
    <section className="senario-wrapper">
      <div className="box-header">
        <span className="box-title">سناریو</span>
      </div>
      <p className="senario-text">
        {senario ? senario.scenario_text : <LittleLoading />}
      </p>
    </section>
  );
};

export default LeadSenario;
