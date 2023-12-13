import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import convert_to_persian from "../../functions/convert-to-persian";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import LittleLoading from "../../reuseables/little-loading";
import { useEffect } from "react";

const Lead = ({ lead, pack, counter }) => {
  const { formular, subjects, years, lead_soursces } = useContext(DataContext);
  const percent = formular
    ? formular.find((f) => f.id === pack.formula_id)
    : false;
  const subject =
    subjects && lead.major !== null
      ? subjects.find((s) => s.id === lead.major)
      : false;
  const year =
    years && lead.grade !== null
      ? years.find((s) => s.id === lead.grade)
      : false;
  // ! subject === 0
  const lead_source = lead_soursces
    ? lead_soursces.find((ls) => ls.id === pack.source_id)
    : false;
  return (
    <div className="number-row">
      <span className="counter-col number-item">
        {convert_to_persian(counter + 1)}
      </span>
      <span className="number-item first-item">{lead.phone_number}</span>
      <span className="number-item call-counts-col">
        {convert_to_persian(lead.calls_count)}
      </span>
      <span className="number-item">{year ? year.name : "وارد نشده"}</span>
      <span className="number-item">
        {subject ? subject.name : "وارد نشده"}
      </span>
      <span className="number-item">
        {percent ? percent.title : <LittleLoading />}
      </span>
      <span className="number-item date-item">
        {lead_source ? lead_source.title : <LittleLoading />}
      </span>
      <span className="number-item last-item">
        <Link
          to={`lead/${lead.id}`}
          className="go-to-lead-page"
          target="_blank"
        >
          جزئیات لید
        </Link>
      </span>
    </div>
  );
};

export default Lead;
