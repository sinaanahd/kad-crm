import React, { useContext, useState } from "react";
import { DataContext } from "../../../data/datacontext";
import LittleLoading from "../../../reuseables/little-loading";
const User = ({ au, years_finder, subject_finder, handle_user_select }) => {
  const { ref_years, ref_subjects } = useContext(DataContext);
  return (
    <div className="table-row">
      <span className="table-item first-col">{au.phone_number}</span>
      <span className="table-item">{au.fullname}</span>
      <span className="table-item">
        {ref_years ? years_finder(au.grade) : <LittleLoading />}
      </span>
      <span className="table-item">
        {ref_subjects ? subject_finder(au.major) : <LittleLoading />}
      </span>
      <span className="table-item last-col">
        <button
          className="choose-user"
          onClick={() => {
            handle_user_select(au);
          }}
        >
          انتخاب کاربر
        </button>
      </span>
    </div>
  );
};

export default User;
