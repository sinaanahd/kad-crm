import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import LittleLoading from "../reuseables/little-loading";
import url from "../../urls/url";
import axios from "axios";
const crm_user = JSON.parse(localStorage.getItem("crm-user")) || false;
const Login = () => {
  const { user, setUser } = useContext(DataContext);
  const [pass_show, set_pass_show] = useState(false);
  const [code, set_code] = useState(false);
  const [code_err, set_code_err] = useState(false);
  const [pause, set_pause] = useState(false);
  const handle_pass = (e) => {
    set_code(e.target.value);
  };
  const handle_pass_check = () => {
    if (code) {
      set_pause(true);
      axios
        .get(`${url.login}${code}`)
        .then((res) => {
          const { error, response, result } = res.data;
          set_pause(false);
          if (result) {
            setUser(response);
            localStorage.setItem("crm-user", JSON.stringify(response));
            if (response.level === 100 || response.level === 80) {
              window.location.pathname = "/add-data";
            } else {
              window.location.pathname = "/my-leads";
            }
          } else {
            if (error === "NO SELLER FOUND") {
              set_code_err("رمز وارد شده اشتباه است");
            } else {
              console.log(error);
              alert("مشکلی پیش آمده لطفا دوباره تلاش کنید");
            }
          }
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    } else {
      set_code_err("رمز وارد نشده است");
    }
  };
  useEffect(() => {
    if (user) {
      if (user.level === 100 || user.level === 80) {
        window.location.pathname = "/add-data";
      } else {
        window.location.pathname = "/my-leads";
      }
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>ورود به پنل فروشندگان</title>
      </Helmet>
      <section className="login-page">
        <h1 className="title">به پنل فروشندگان کاد خوش آمدید</h1>
        <p className="desc">
          برای ورود لازم است کد ورود اختصاصی خود را وارد کنید
        </p>
        <div className="input-box">
          <input
            type={pass_show ? "text" : "password"}
            name=""
            id=""
            placeholder="کد ورود خود را وارد کنید"
            onInput={handle_pass}
          />
          <button
            className="show-pass"
            onClick={() => {
              set_pass_show(!pass_show);
            }}
          >
            {pass_show ? "پنهان کردن" : "نمایش رمز"}
          </button>
        </div>
        {code_err ? <span className="error-box">{code_err}</span> : <></>}
        {pause ? (
          <button className="submit-entry-code">
            <LittleLoading />
          </button>
        ) : (
          <button className="submit-entry-code" onClick={handle_pass_check}>
            ورود
          </button>
        )}
      </section>
    </>
  );
};

export default Login;
