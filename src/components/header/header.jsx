import React, { useState } from "react";
import LittleLoading from "../reuseables/little-loading";
import avatar from "../../asset/images/header/avatar.jpg";
import arrow_down from "../../asset/images/header/arrow_drop_down.svg";
import notif_icon from "../../asset/images/header/bell.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Header = ({ user }) => {
  const [pop_up, set_pop_up] = useState(false);
  const exit_panel = () => {
    localStorage.clear();
    window.location.pathname = "/login";
  };
  return (
    <>
      <header className="main-header">
        <div
          className="user-data"
          onClick={() => {
            set_pop_up(!pop_up);
          }}
        >
          <img
            src={avatar}
            alt="نام کاربر"
            width={41}
            height={41}
            className="user-img"
          />
          <span className="user-name-wrapper">
            {user ? user.fullname : <LittleLoading />}
          </span>
          <img src={arrow_down} alt="باز کردن" width={24} height={25} />
          {pop_up ? (
            <div className="user-pop-up-options">
              <span className="pop-up-option exit" onClick={exit_panel}>
                خروج از پنل
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="header-icons">
          <div className="notif-wrapper">
            <img
              src={notif_icon}
              alt="اطلاعیه ها"
              width={17}
              height={25}
              className="notif-img"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
