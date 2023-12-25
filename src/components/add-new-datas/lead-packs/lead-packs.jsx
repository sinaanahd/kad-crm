import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
import LeadPackItem from "./lead-pack-item/lead-pack-item";
import ReloadBtn from "../../reuseables/reload-btn";
const LeadPacks = () => {
  const { lead_packs, get_lead_packs, set_lead_packs } =
    useContext(DataContext);
  const handle_reload = () => {
    set_lead_packs(false);
    get_lead_packs();
  };
  return (
    <section className="lead-packs-box box-style">
      <div className="box-header">
        <span className="box-title">تمامی لید پک ها</span>
        <ReloadBtn click={handle_reload} />
      </div>
      <div className="all-lead-packs all-wrapper">
        {lead_packs ? (
          lead_packs.map((lp) => <LeadPackItem lp={lp} key={lp.id} />)
        ) : (
          <LittleLoading />
        )}
      </div>
    </section>
  );
};

export default LeadPacks;
