import React, { useState, useContext } from "react";
import LittleLoading from "../../reuseables/little-loading";
import { DataContext } from "../../data/datacontext";
const LeadSources = () => {
  const { lead_soursces } = useContext(DataContext);
  const [filtered, set_filtered] = useState(false);
  const handle_lead_search = (e) => {
    const value = e.target.value;
    if (value.length > 2) {
      const filtered = lead_soursces.filter((ls) => ls.title.includes(value));
      set_filtered(filtered);
    } else {
      set_filtered(false);
    }
  };
  return (
    <div className="choose-box-item">
      <div className="search-choose-item">
        <input type="text" placeholder="جستجو" onInput={handle_lead_search} />
      </div>
      <div className="choose-items">
        {lead_soursces ? (
          filtered ? (
            filtered.length !== 0 ? (
              filtered.map((ls) => (
                <span className="choose-item" key={ls.id}>
                  {ls.title}
                </span>
              ))
            ) : (
              "موردی یافت نشد"
            )
          ) : lead_soursces.length !== 0 ? (
            lead_soursces.map((ls) => (
              <span className="choose-item" key={ls.id}>
                {ls.title}
              </span>
            ))
          ) : (
            "موردی برای نمایش وجود ندارد"
          )
        ) : (
          <LittleLoading />
        )}
      </div>
    </div>
  );
};

export default LeadSources;
