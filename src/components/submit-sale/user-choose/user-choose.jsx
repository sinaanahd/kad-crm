import React, { useState, useContext, useEffect } from "react";
import LittleLoading from "../../reuseables/little-loading";
import { DataContext } from "../../data/datacontext";
import axios from "axios";
import urls from "../../../urls/url";

import magnifier from "../../../asset/images/leads/magnifier.svg";
const all_users_data =
  JSON.parse(localStorage.getItem("users-summary")) || false;
const UserChoose = ({ set_selected_user, set_make_user }) => {
  const { ref_subjects, ref_years } = useContext(DataContext);
  const [all_users, set_all_users] = useState(all_users_data);
  const [searched_users, set_searched_users] = useState(false);
  const [disable_part, set_disable_part] = useState(false);
  useEffect(() => {
    axios
      .get(urls.all_users_summary)
      .then((res) => {
        const { error, response, result } = res.data;
        if (result) {
          set_all_users(response);
          localStorage.setItem("users-summary", JSON.stringify(response));
          console.log(response.filter((r) => !r.phone_number));
        } else {
          alert("مشکلی پیش آمده");
          console.log(error);
        }
      })
      .catch((e) => {
        alert("مشکلی پیش آمده");
        console.log(e.message, e);
      });
  }, []);
  const subject_finder = (id) => {
    const subject = ref_subjects.find((s) => s.id === id);
    return subject ? subject.name : "ثبت نشده";
  };
  const years_finder = (id) => {
    const year = ref_years.find((y) => y.id === id);
    return year ? year.name : "ثبت نشده";
  };
  const search_users = (e) => {
    const value = e.target.value;
    const searched_users = all_users.filter(
      (u) => u.phone_number && u.phone_number.startsWith(value)
    );
    set_searched_users(searched_users);
  };
  const reques_to_make_user = () => {
    set_make_user(true);
    set_disable_part(true);
  };
  const handle_user_select = (user) => {
    set_selected_user(user);
    set_disable_part(true);
    console.log(user);
  };
  return (
    <section
      className={
        disable_part
          ? "phone-part-wrapper box-style disabled-part"
          : "phone-part-wrapper box-style"
      }
    >
      <div className="section-header">
        <span className="header-title">یوزر های سایت</span>
        <span className="header-input-place">
          <img src={magnifier} alt="جستجو" />
          <input
            type="number"
            placeholder="جستجوی شماره"
            onInput={search_users}
          />
        </span>
      </div>
      <div className="user-numbers-table">
        <div className="table-head table-row">
          <span className="table-item first-col table-head-item">شماره</span>
          <span className="table-item table-head-item">نام</span>
          <span className="table-item table-head-item">پایه</span>
          <span className="table-item table-head-item">رشته</span>
          <span className="table-item table-head-item"></span>
        </div>
        {all_users ? (
          searched_users ? (
            searched_users.length !== 0 ? (
              searched_users.map((au, i) => (
                <div className="table-row" key={i++}>
                  <span className="table-item first-col">
                    {au.phone_number}
                  </span>
                  <span className="table-item">{au.fullname}</span>
                  <span className="table-item">
                    {ref_years ? (
                      years_finder(au.grade)
                    ) : (
                      //   au.grade
                      <LittleLoading />
                    )}
                  </span>
                  <span className="table-item">
                    {ref_subjects ? (
                      subject_finder(au.major)
                    ) : (
                      <LittleLoading />
                    )}
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
              ))
            ) : (
              <div className="no-user-found">
                <span className="no-user-text">
                  کاربری با این شماره پیدا نشد
                </span>
                <button onClick={reques_to_make_user} className="choose-user">
                  ثبت شماره جدید
                </button>
              </div>
            )
          ) : (
            all_users.map((au, i) => (
              <div className="table-row" key={i++}>
                <span className="table-item first-col">{au.phone_number}</span>
                <span className="table-item">{au.fullname}</span>
                <span className="table-item">
                  {ref_years ? (
                    years_finder(au.grade)
                  ) : (
                    //   au.grade
                    <LittleLoading />
                  )}
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
            ))
          )
        ) : (
          <LittleLoading />
        )}
      </div>
    </section>
  );
};

export default UserChoose;
