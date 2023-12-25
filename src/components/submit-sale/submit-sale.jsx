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
import urls from "../../urls/url";
const products_local =
  JSON.parse(localStorage.getItem("all-products")) || false;
const SubmitSale = () => {
  const [selected_user, set_selected_user] = useState(false);
  const [make_user, set_make_user] = useState(false);
  const [sale, set_sale] = useState(false);
  const [is_final, set_is_final] = useState(false);
  const [products, set_products] = useState(products_local);
  // ! make return back btn
  const [stage, set_stage] = useState(false);

  return (
    <>
      <Helmet>
        <title>ثبت فروش</title>
      </Helmet>
      <div className="submit-sale-page-wrapper mm-width">
        <UserChoose
          set_selected_user={set_selected_user}
          set_make_user={set_make_user}
        />
        {make_user ? <MakeUser set_selected_user={set_selected_user} /> : <></>}
        {/* <MakeUser set_selected_user={set_selected_user} /> */}
        {selected_user ? (
          <SaleData
            selected_user={selected_user}
            set_sale={set_sale}
            products={products}
            set_products={set_products}
          />
        ) : (
          <></>
        )}
        {/* <SaleData /> */}
        {sale ? (
          <PaymentsData
            sale={sale}
            set_sale={set_sale}
            set_is_final={set_is_final}
          />
        ) : (
          <></>
        )}
        {/* <PaymentsData
          sale={sale}
          set_sale={set_sale}
          set_is_final={set_is_final}
        /> */}
        {is_final ? (
          <FinalFactor
            sale={sale}
            selected_user={selected_user}
            products={products}
          />
        ) : (
          <></>
        )}
        {/* <FinalFactor
          sale={sale}
          selected_user={selected_user}
          products={products}
        /> */}
      </div>
    </>
  );
};

export default SubmitSale;
