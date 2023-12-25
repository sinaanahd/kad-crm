import React, { useState } from "react";
import { Helmet } from "react-helmet";
import CallResults from "./call-results/call-results";
import LeadPacks from "./lead-packs/lead-packs";
import Senarios from "./senarios/senarios";
import LeadSources from "./lead-sources/lead-sources";
import Formulars from "./formulars/formulars";

const AddNewDatas = () => {
  return (
    <>
      <Helmet>
        <title>اضافه کردن دیتا</title>
      </Helmet>
      <div className="add-new-datas-page">
        <CallResults />
        <LeadPacks />
        <Formulars />
        <LeadSources />
        <Senarios />
      </div>
    </>
  );
};

export default AddNewDatas;
