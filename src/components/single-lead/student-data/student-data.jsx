import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import axios from "axios";
import urls from "../../../urls/url";
import LittleLoading from "../../reuseables/little-loading";
const StudentData = ({ lead, set_lead }) => {
  const { subjects, years } = useContext(DataContext);
  const [option_box, set_option_box] = useState(false);
  const [fullname, set_fullname] = useState(false);
  const [fullname_err, set_fullname_err] = useState(false);
  const [shahr, set_shahr] = useState(false);
  const [description, set_description] = useState(false);
  const [shahr_err, set_shahr_err] = useState(false);
  const [description_err, set_description_err] = useState(false);
  const [grade, set_grade] = useState(false);
  const [major, set_major] = useState(false);
  const [pause, setPause] = useState(false);
  const subject =
    subjects && lead && lead.major !== null
      ? subjects.find((s) => s.id === lead.major)
      : false;
  const year =
    years && lead && lead.grade !== null
      ? years.find((s) => s.id === lead.grade)
      : false;
  // ! subject === 0
  const update_user_info = () => {
    if (fullname || shahr || grade || major || description) {
      setPause(true);
      const send_obj = {
        fullname: fullname ? fullname : lead.fullname,
        shahr: shahr ? shahr : lead.shahr,
        grade: grade ? grade.id : lead.garde,
        major: major ? major.id : lead.major,
        description: description ? description : lead.description,
      };
      axios
        .patch(urls.single_lead + lead.id, send_obj)
        .then((res) => {
          setPause(false);
          const { error, response, result } = res.data;
          console.log(res.data);
          if (result) {
            set_lead(response);
          } else {
            alert("مشکلی پیش آمده");
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e.message);
          setPause(false);
        });
    } else {
      alert("اطلاعاتی برای تغییر وارد نشده است");
    }
  };
  const handle_option_boxes = (entry) => {
    if (entry === option_box) {
      set_option_box(false);
    } else {
      set_option_box(entry);
    }
  };
  const handle_name = (e) => {
    const value = e.target.value;
    if (value.length < 5) {
      set_fullname(false);
      set_fullname_err("نام وارد شده کوتاه است");
    } else if (value.length > 49) {
      set_fullname(false);
      set_fullname_err("نام وارد شده بلند است");
    } else {
      set_fullname(value);
      set_fullname_err(false);
    }
  };
  const handle_shahr = (e) => {
    const value = e.target.value;
    if (value.length < 2) {
      set_shahr(false);
      set_shahr_err("نام وارد شده کوتاه است");
    } else if (value.length > 49) {
      set_shahr(false);
      set_shahr_err("نام وارد شده بلند است");
    } else {
      set_shahr(value);
      set_shahr_err(false);
    }
  };
  const handle_description = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_description(false);
      set_description_err("نام وارد شده کوتاه است");
    } else if (value.length > 49) {
      set_description(false);
      set_description_err("نام وارد شده بلند است");
    } else {
      set_description(value);
      set_description_err(false);
    }
  };
  return (
    <section className="lead-datas">
      <div className="box-header">
        <span className="box-title">اطلاعات شخصی دانش آموز</span>
      </div>
      <span className="input-wrapper">
        <span className="input-title">اسم</span>
        <span className="input-box">
          <input
            type="text"
            placeholder={
              lead
                ? lead.fullname
                  ? lead.fullname
                  : "اسم را وارد کنید"
                : "اسم را وارد کنید"
            }
            onInput={handle_name}
          />
          {fullname_err ? (
            <span className="err-place">{fullname_err}</span>
          ) : (
            <></>
          )}
        </span>
      </span>
      <span className="input-wrapper">
        <span className="input-title">پایه</span>
        <span
          className="input-box select-box"
          onClick={() => {
            handle_option_boxes("year");
          }}
        >
          {grade ? grade.name : year ? year.name : "پایه تحصیلی را انتخاب کنید"}
        </span>
        {option_box === "year" ? (
          <span className="box-items">
            {years ? (
              years.map((y) => (
                <span
                  className="option-item"
                  key={y.id}
                  onClick={() => {
                    set_grade(y);
                    set_option_box(false);
                  }}
                >
                  {y.name}
                </span>
              ))
            ) : (
              <LittleLoading />
            )}
          </span>
        ) : (
          <></>
        )}
      </span>
      <span className="input-wrapper">
        <span className="input-title">رشته</span>
        <span
          className="input-box select-box"
          onClick={() => {
            handle_option_boxes("subject");
          }}
        >
          {major
            ? major.name
            : subject
            ? subject.name
            : "رشته تحصیلی را انتخاب کنید"}
        </span>
        {option_box === "subject" ? (
          <span className="box-items">
            {subjects ? (
              subjects.map((s) => (
                <span
                  className="option-item"
                  key={s.id}
                  onClick={() => {
                    set_major(s);
                    set_option_box(false);
                  }}
                >
                  {s.name}
                </span>
              ))
            ) : (
              <LittleLoading />
            )}
          </span>
        ) : (
          <></>
        )}
      </span>
      <span className="input-wrapper">
        <span className="input-title">شهر</span>
        <span className="input-box">
          <input
            onInput={handle_shahr}
            type="text"
            placeholder={
              lead
                ? lead.shahr
                  ? lead.shahr
                  : "شهر را وارد کنید"
                : "شهر را وارد کنید"
            }
          />
          {shahr_err ? <span className="err-place">{shahr_err}</span> : <></>}
        </span>
      </span>
      <span className="input-wrapper">
        <span className="input-title">شماره ۱</span>
        <span className="input-box">
          <input
            type="number"
            disabled={true}
            placeholder={
              lead
                ? lead.other_contacts_list[0]
                  ? lead.other_contacts_list[0]
                  : "شماره را وارد کنید"
                : "شماره را وارد کنید"
            }
          />
        </span>
      </span>
      <span className="input-wrapper">
        <span className="input-title">شماره ۲</span>
        <span className="input-box">
          <input
            type="number"
            disabled={true}
            placeholder={
              lead
                ? lead.other_contacts_list[1]
                  ? lead.other_contacts_list[1]
                  : "شماره را وارد کنید"
                : "شماره را وارد کنید"
            }
          />
        </span>
      </span>
      <span className="input-wrapper">
        <span className="input-title">شماره ۳</span>
        <span className="input-box">
          <input
            type="number"
            disabled={true}
            placeholder={
              lead
                ? lead.other_contacts_list[2]
                  ? lead.other_contacts_list[2]
                  : "شماره را وارد کنید"
                : "شماره را وارد کنید"
            }
          />
        </span>
      </span>
      <span className="input-wrapper">
        <span className="input-title">توضیحات</span>
        <span className="input-box">
          <textarea
            onInput={handle_description}
            type="text"
            placeholder={
              lead
                ? lead.description
                  ? lead.description
                  : "توضیحات را اضافه کنید"
                : "توضیحات را اضافه کنید"
            }
          />
          {description_err ? (
            <span className="err-place">{description_err}</span>
          ) : (
            <></>
          )}
        </span>
      </span>
      <span className="input-wrapper">
        <span className="input-title"></span>
        <span className="input-box">
          {pause ? (
            <span className="submit-data-changes">
              <LittleLoading />
            </span>
          ) : (
            <span className="submit-data-changes" onClick={update_user_info}>
              ثبت تغییرات
            </span>
          )}
        </span>
      </span>
    </section>
  );
};

export default StudentData;
