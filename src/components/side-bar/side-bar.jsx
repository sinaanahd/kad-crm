import React, { useContext, useEffect, useState } from "react";
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
import { DataContext } from "../data/datacontext";
const SideBar = () => {
  const { user } = useContext(DataContext);
  const [page_decider, set_page_decider] = useState(false);
  const [open_close, set_open_close] = useState(false);
  const [menu_items, set_menu_items] = useState(false);
  const all_pages = [
    {
      id: 1,
      authorized_levels: [100, 80],
      text: "ساخت لید جدید",
      imgs: [my_courses_icon],
      url: "make-lead-pack",
    },
    {
      id: 2,
      authorized_levels: [40],
      text: "لید های من",
      imgs: [my_courses_icon],
      url: "my-leads",
    },
    {
      id: 3,
      authorized_levels: [100, 80],
      text: "ساخت دیتا",
      imgs: [my_courses_icon],
      url: "add-data",
    },
    {
      id: 4,
      authorized_levels: [40],
      text: "ثبت فروش",
      url: "submit-sale",
      imgs: [my_courses_icon],
    },
    {
      id: 5,
      authorized_levels: [],
      text: "",
      url: "",
    },
    {
      id: 6,
      authorized_levels: [],
      text: "",
      url: "",
    },
  ];
  useEffect(() => {
    setInterval(() => {
      check_page();
    }, 1000);
  }, []);
  useEffect(() => {
    if (user) {
      const menu_items = all_pages.filter((p) =>
        p.authorized_levels.includes(user.level)
      );
      set_menu_items(menu_items);
    }
  }, [user]);
  const check_page = () => {
    set_page_decider(window.location.pathname.split("/")[1]);
  };
  return (
    <>
      <aside
        className={open_close ? "side-bar-wrapper open" : "side-bar-wrapper"}
      >
        <ul className="side-bar-items">
          {menu_items ? (
            menu_items.map((mi) => (
              <li
                key={mi.id}
                onClick={() => {
                  set_open_close(false);
                  check_page();
                }}
                className={
                  page_decider === mi.url
                    ? "side-bar-item active"
                    : "side-bar-item"
                }
              >
                <Link to={`/${mi.url}`} className="link-side-bar">
                  <img
                    width={24}
                    height={24}
                    src={
                      page_decider === "make-lead-pack"
                        ? mi.imgs[0]
                        : mi.imgs[0]
                    }
                    alt={mi.text}
                    className="side-bar-img"
                  />
                  <span className="side-text">{mi.text}</span>
                </Link>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
