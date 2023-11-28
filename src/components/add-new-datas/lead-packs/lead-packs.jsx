import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
import LeadPackItem from "./lead-pack-item/lead-pack-item";
const LeadPacks = () => {
  const { lead_packs } = useContext(DataContext);

  return (
    <section className="lead-packs-box box-style">
      <div className="box-header">
        <span className="box-title">تمامی لید پک ها</span>
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
