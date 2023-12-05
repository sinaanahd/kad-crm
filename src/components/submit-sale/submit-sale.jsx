import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import { DataContext } from "../data/datacontext";
import axios from "axios";
import MakeUser from "./make-user/make-user";
import SaleData from "./sale-data/sale-data";
import PaymentsData from "./payments-data/payments-data";
import UserChoose from "./user-choose/user-choose";
import FinalFactor from "./final-factor/final-factor";

const SubmitSale = () => {
  return (
    <>
      <Helmet>
        <title>ثبت فروش</title>
      </Helmet>
      <div className="submit-sale-page-wrapper mm-width">
        <UserChoose />
        <MakeUser />
        <SaleData />
        <PaymentsData />
        <FinalFactor />
      </div>
    </>
  );
};

export default SubmitSale;
