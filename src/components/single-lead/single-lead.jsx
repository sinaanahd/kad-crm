import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import convert_to_persian from "../functions/convert-to-persian";
import axios from "axios";
import urls from "../../urls/url";
import LittleLoading from "../reuseables/little-loading";
import StudentData from "./student-data/student-data";
import LeadSenario from "./lead-senario/lead-senario";
import LeadFormulars from "./lead-formulars/lead-formulars";
import CallInfo from "./call-info/call-info";
const SingleLead = () => {
  const [lead, set_lead] = useState(false);
  useEffect(() => {
    const page_slug = window.location.pathname.split("/")[2];
    console.log(page_slug);
    axios
      .get(urls.single_lead + page_slug)
      .then((res) => {
        const { error, response, result } = res.data;
        console.log(res.data);
        if (result) {
          set_lead(response);
        } else {
          console.log(error);
          alert("مشکلی پیش آمده");
        }
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <>
      <Helmet>
        <title>اطلاعات لید {lead ? lead.phone_number : ""}</title>
      </Helmet>
      <div className="single-lead-page mm-width">
        <div className="box-header">
          <span className="box-title">
            جزئیات لید {lead ? lead.phone_number : <LittleLoading />}
          </span>
          <span className="submit-sale">ثبت فروش</span>
        </div>
        <div className="main-columns">
          <div className="lead-details-senario-wrapper">
            <StudentData lead={lead} set_lead={set_lead} />
            <LeadSenario lead={lead} />
          </div>
          <div className="porsant-call-history">
            <LeadFormulars lead={lead} />
            <CallInfo lead={lead} set_lead={set_lead} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleLead;
