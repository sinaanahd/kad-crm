import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import profile_icon from "../../asset/images/side-bar/profile-icon.svg";
import profile_icon_active from "../../asset/images/side-bar/profile-icon-active.svg";
import my_courses_icon from "../../asset/images/side-bar/mycourses-icon.svg";
import my_courses_icon_active from "../../asset/images/side-bar/mycourses-icon-active.svg";
import finance_icon from "../../asset/images/side-bar/finance-icon.svg";
import finance_icon_active from "../../asset/images/side-bar/finance-icon-active.svg";
import guides_icon from "../../asset/images/side-bar/guides-icon.svg";
import guides_icon_active from "../../asset/images/side-bar/guides-icon-active.svg";
import dashboard_icon from "../../asset/images/side-bar/dashboard-icon.svg";
import dashboard_icon_active from "../../asset/images/side-bar/dashboard-icon-active.svg";
import arrowDown from "../../asset/images/side-bar/arrow-down.svg";
const SideBar = () => {
  const [page_decider, set_page_decider] = useState(false);
  const [open_close, set_open_close] = useState(false);
  useEffect(() => {
    setInterval(() => {
      check_page();
    }, 1000);
  }, []);
  const check_page = () => {
    set_page_decider(window.location.pathname.split("/")[1]);
  };
  return (
    <>
      <aside
        className={open_close ? "side-bar-wrapper open" : "side-bar-wrapper"}
      >
        <ul className="side-bar-items">
          <li
            onClick={() => {
              set_open_close(false);
              check_page();
            }}
            className={
              page_decider === "make-lead-pack"
                ? "side-bar-item active"
                : "side-bar-item"
            }
          >
            <Link to="/make-lead-pack" className="link-side-bar">
              <img
                width={24}
                height={24}
                src={
                  page_decider === "make-lead-pack"
                    ? my_courses_icon_active
                    : my_courses_icon
                }
                alt="لیدپک ها"
                className="side-bar-img"
              />
              <span className="side-text">ساخت لید جدید</span>
            </Link>
          </li>
          <li
            onClick={() => {
              set_open_close(false);
              check_page();
            }}
            className={
              page_decider === "my-leads"
                ? "side-bar-item active"
                : "side-bar-item"
            }
          >
            <Link to="/my-leads" className="link-side-bar">
              <img
                width={24}
                height={24}
                src={
                  page_decider === "my-leads"
                    ? my_courses_icon_active
                    : my_courses_icon
                }
                alt="لیدپک ها"
                className="side-bar-img"
              />
              <span className="side-text">لید های من</span>
            </Link>
          </li>
          {/*
          <li
            onClick={() => {
              set_open_close(false);
              check_page();
            }}
            className={
              page_decider === "dashboard"
                ? "side-bar-item active"
                : "side-bar-item"
            }
          >
            <Link className="link-side-bar" to="/dashboard">
              <img
                width={24}
                height={24}
                src={
                  page_decider === "dashboard"
                    ? dashboard_icon_active
                    : dashboard_icon
                }
                alt="اسم آیتم"
                className="side-bar-img"
              />
              <span className="side-text">میزکار</span>
            </Link>
          </li>
          <li
            onClick={() => {
              set_open_close(false);
              check_page();
            }}
            className={
              page_decider === "profile"
                ? "side-bar-item active"
                : "side-bar-item"
            }
          >
            <Link className="link-side-bar" to="/profile">
              <img
                width={24}
                height={24}
                src={
                  page_decider === "profile"
                    ? profile_icon_active
                    : profile_icon
                }
                alt="اطلاعات کاربری"
                className="side-bar-img"
              />
              <span className="side-text">اطلاعات کاربری</span>
            </Link>
          </li>
          <li
            onClick={() => {
              set_open_close(false);
              check_page();
            }}
            className={
              page_decider === "finance"
                ? "side-bar-item active"
                : "side-bar-item"
            }
          >
            <Link className="link-side-bar" to="/finance">
              <img
                width={24}
                height={24}
                src={
                  page_decider === "finance"
                    ? finance_icon_active
                    : finance_icon
                }
                alt="امور مالی"
                className="side-bar-img"
              />
              <span className="side-text">امور مالی</span>
            </Link>
          </li>
          <li
            onClick={() => {
              set_open_close(false);
              check_page();
            }}
            className={
              page_decider === "guides"
                ? "side-bar-item active"
                : "side-bar-item"
            }
          >
            <Link className="link-side-bar" to="/guides">
              <span className="img-wrapper">
                <img
                  src={
                    page_decider === "guides" ? guides_icon_active : guides_icon
                  }
                  alt="آموزش ها"
                  className="side-bar-img"
                />
              </span>
              <span className="side-text">آموزش ها</span>
            </Link>
          </li>

          <li
            onClick={() => {
              set_open_close(false);
              check_page();
            }}
            className={
              page_decider === "shop" ? "side-bar-item active" : "side-bar-item"
            }
          >
            <Link className="link-side-bar" to="/shop">
              <img
                width={24}
                height={24}
                src={
                  page_decider === "shop"
                    ? my_courses_icon_active
                    : my_courses_icon
                }
                alt="اسم آیتم"
                className="side-bar-img"
              />
              <span className="side-text">خرید درس</span>
            </Link>
          </li>
          <li
            onClick={() => {
              set_open_close(false);
              check_page();
            }}
            className={
              page_decider === "cart" ? "side-bar-item active" : "side-bar-item"
            }
          >
            <Link className="link-side-bar" to="/cart">
              <img
                width={24}
                height={24}
                src={
                  page_decider === "cart" ? profile_icon_active : profile_icon
                }
                alt="اسم آیتم"
                className="side-bar-img"
              />
              <span className="side-text">سبد خرید</span>
            </Link>
          </li>
          
           */}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
