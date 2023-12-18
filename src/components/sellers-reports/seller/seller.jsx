import React, { useState } from "react";
const Seller = ({ s, set_picked_seller }) => {
  return (
    <div className="seller-wrapper">
      <h2 className="seller-name">{s.fullname}</h2>
      <button
        className="pick-date"
        onClick={() => {
          set_picked_seller(s);
        }}
      >
        انتخاب تاریخ
      </button>
    </div>
  );
};

export default Seller;
