import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import { DataContext } from "../data/datacontext";
import Seller from "./seller/seller";
import PickDate from "./pick-date/pick-date";
const SellersReport = () => {
  const { sellers } = useContext(DataContext);
  const [picked_seller, set_picked_seller] = useState(false);
  return (
    <>
      <Helmet>
        <title>فروشندگان</title>
      </Helmet>
      <div className="sellers-report-page">
        <div className="section-header">
          <h1 className="page-title">فروشندگان</h1>
        </div>
        <div className="sellers-wrapper">
          {sellers ? (
            sellers.map((s) => (
              <Seller s={s} key={s.id} set_picked_seller={set_picked_seller} />
            ))
          ) : (
            <LittleLoading />
          )}
        </div>
        {picked_seller ? (
          <PickDate
            set_picked_seller={set_picked_seller}
            picked_seller={picked_seller}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SellersReport;
