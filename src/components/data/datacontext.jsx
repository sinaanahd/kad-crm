import { createContext, useState, useEffect } from "react";
import last_login_check from "../functions/last-login-check";
import axios from "axios";
import urls from "../../urls/url";

const user_data = JSON.parse(localStorage.getItem("crm-user")) || false;
const kelasses_data = JSON.parse(localStorage.getItem("kelasses")) || false;
const jalasat_data = JSON.parse(localStorage.getItem("jalasat")) || false;
const teachers_data = JSON.parse(localStorage.getItem("teachers")) || false;
const pay_info_data = JSON.parse(localStorage.getItem("pay_info")) || false;
const sample_files_data =
  JSON.parse(localStorage.getItem("sample_files")) || false;
const this_time_login = new Date().getTime();
const last_login = JSON.parse(localStorage.getItem("LL"))
  ? JSON.parse(localStorage.getItem("LL"))
  : this_time_login;
const course_data = JSON.parse(localStorage.getItem("courses")) || false;
const cart_data = JSON.parse(localStorage.getItem("cart")) || false;
const senarios_data = JSON.parse(localStorage.getItem("senarios")) || false;
const lead_sources_data =
  JSON.parse(localStorage.getItem("lead_sources")) || false;
const formular_data = JSON.parse(localStorage.getItem("formular")) || false;
const lead_packs_data = JSON.parse(localStorage.getItem("lead_packs")) || false;
const sellers_data = JSON.parse(localStorage.getItem("sellers")) || false;
const seller_lead_pcaks_data =
  JSON.parse(localStorage.getItem("seller_lead_pcaks")) || false;
const call_results_data =
  JSON.parse(localStorage.getItem("call_results")) || false;
const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [user, setUser] = useState(user_data);
  const [kelasses, setKelasses] = useState(kelasses_data);
  const [jalasat, set_jalasat] = useState(jalasat_data);
  const [teachers, setTeachers] = useState(teachers_data);
  const [sample_files, set_sample_files] = useState(sample_files_data);
  const [pay_info, setPay_info] = useState(pay_info_data);
  const [courses, setCourses] = useState(course_data);
  const [cart, set_cart] = useState(cart_data);

  const subjects = [
    { id: 0, name: "ریاضی" },

    { id: 1, name: "تجربی" },

    { id: 2, name: "انسانی" },

    { id: 3, name: "هنر" },
  ];
  const years = [
    {
      id: 10,
      name: "دهم",
    },
    {
      id: 11,
      name: "یازدهم",
    },
    {
      id: 12,
      name: "دوازدهم",
    },
    {
      id: 18,
      name: "کنکور",
    },
    {
      id: 0,
      name: "فارغ التحصیل",
    },
  ];
  const doreha = [
    {
      dore_id: 5,
      dore_title: "سالانه",
      slug_name: "سالانه",
    },
    {
      dore_id: 6,
      dore_title: "آفلاین",
      slug_name: "آفلاین",
    },
  ];

  const [senarios, set_senarios] = useState(senarios_data);
  const [lead_soursces, set_lead_soursces] = useState(lead_sources_data);
  const [formular, set_formular] = useState(formular_data);
  const [lead_packs, set_lead_packs] = useState(lead_packs_data);
  const [sellers, set_sellers] = useState(sellers_data);
  const [seller_lead_pcaks, set_seller_lead_pcaks] = useState(
    seller_lead_pcaks_data
  );
  const [call_results, set_call_results] = useState(call_results_data);
  useEffect(() => {
    const is_login_page = window.location.pathname === "/login";
    get_senarios();
    get_lead_sources();
    get_formulars();
    get_lead_packs();
    get_sellers();
    get_call_results();
    if (!user) {
      if (!is_login_page) {
        window.location.pathname = "/login";
      }
    } else {
      get_seller_lead_packs();
    }
    // if (user) {
    //   get_user(user.user_id);
    // }
    // const is_time = last_login_check(last_login, this_time_login);
    // if (is_time) {
    //   if (user) {
    //     get_info(user.user_id);
    //   }
    //   get_kelasses();
    //   get_jalasat();
    //   get_sample_files();
    //   get_courses();
    // } else {
    //   if (!kelasses_data) {
    //     get_kelasses();
    //   }
    //   if (!jalasat_data) {
    //     get_jalasat();
    //   }
    //   if (!sample_files_data) {
    //     get_sample_files();
    //   }
    //   if (!course_data) {
    //     get_courses();
    //   }
    //   if (user) {
    //     if (!pay_info_data) {
    //       get_info(user.user_id);
    //     }
    //   }
    // }
    // if (user) {
    //   get_user(user.user_id);
    // }
  }, []);
  const get_teachers = () => {
    axios
      .get("https://kadschool.com/backend/kad_api/teachers")
      .then((res) => {
        const teachers = res.data;
        setTeachers(teachers);
        localStorage.setItem("teachers", JSON.stringify(teachers));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_jalasat = () => {
    axios
      .get("https://kadschool.com/backend/kad_api/admin_jalasat")
      .then((res) => {
        const jalasat = res.data;
        set_jalasat(jalasat);
        localStorage.setItem("jalasat", JSON.stringify(jalasat));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_user = (id) => {
    axios
      .get(``)
      .then((res) => {
        const user = res.data;
        setUser(user);
        // console.log(user);
        localStorage.setItem("crm-user", JSON.stringify(user));
      })
      .catch((e) => console.log(e.message));
  };
  const get_kelasses = () => {
    axios
      .get("https://kadschool.com/backend/kad_api/kelases")
      .then((res) => {
        const kelasses = res.data;
        setKelasses(kelasses);
        localStorage.setItem("kelasses", JSON.stringify(kelasses));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_sample_files = () => {
    axios
      .get("https://kadschool.com/backend/kad_api/sample_files")
      .then((res) => {
        const sample_files = res.data;
        set_sample_files(sample_files);
        localStorage.setItem("sample_files", JSON.stringify(sample_files));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_info = (id) => {
    axios
      .get(`https://kadschool.com/backend/kad_api/financial_records/${id}`)
      .then((res) => {
        const pay_info = res.data;
        // console.log(pay_info);
        setPay_info(pay_info.reverse());
        localStorage.setItem("pay_info", JSON.stringify(pay_info));
      })
      .catch((e) => console.log(e.message));
  };
  const get_courses = () => {
    axios
      .get("https://kadschool.com/backend/kad_api/courses")
      .then((res) => {
        const courses = res.data;
        setCourses(courses);
        // console.log(courses);
        localStorage.setItem("courses", JSON.stringify(courses));
      })
      .catch((e) => console.log(e.message));
  };
  const handle_cart = (obj) => {
    const cart_sample_obj = {
      ids: [],
      items: [],
      pure_price: 0,
      discounts: 0,
      final_price: 0,
    };
    const new_cart = cart ? { ...cart } : cart_sample_obj;
    const searched_obj = new_cart.items.find(
      (item) => item.kelas_id === obj.kelas_id
    );
    if (!searched_obj) {
      new_cart.items.push(obj);
      new_cart.ids = get_ids(new_cart.items);
      new_cart.pure_price = calculate_pure_price(new_cart.items);
      new_cart.discounts = calculate_discounts(new_cart.items);
      new_cart.final_price = new_cart.pure_price - new_cart.discounts;
    } else {
      const deleted_cart = delete_from_cart(new_cart, searched_obj.kelas_id);
      new_cart.ids = get_ids(deleted_cart.items);
      new_cart.pure_price = calculate_pure_price(new_cart.items);
      new_cart.discounts = calculate_discounts(new_cart.items);
      new_cart.final_price = new_cart.pure_price - new_cart.discounts;
    }
    finilize_cart(new_cart);
  };
  const delete_from_cart = (cart, id) => {
    const index = cart.items.findIndex((item) => item.kelas_id === id);
    const splice_need = { ...cart };
    splice_need.items.splice(index, 1);
    return splice_need;
  };
  const finilize_cart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    set_cart(cart);
    // console.log(cart);
  };
  const get_ids = (arr) => {
    return arr.map((i) => i.kelas_id);
  };
  const calculate_pure_price = (arr) => {
    let sum = 0;
    arr.forEach((item) => {
      sum += item.price;
    });
    return sum;
  };
  const calculate_discounts = (arr) => {
    let sum = 0;
    arr.forEach((item) => {
      let discount_amount = 0;
      if (item.discounted_price) {
        discount_amount = item.price - item.discounted_price;
      }
      sum += discount_amount;
    });
    return sum;
  };

  /* main apis */
  const get_senarios = () => {
    axios
      .get(`${urls.senarios}`)
      .then((res) => {
        const { error, response, result } = res.data;
        // console.log(res.data);
        if (result) {
          set_senarios(response);
          localStorage.setItem("senarios", JSON.stringify(response));
        } else {
          console.log(error);
          alert("مشکلی در دریافت سناریو ها پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const out_side_senario_setter = (data) => {
    set_senarios(data);
    localStorage.setItem("senarios", JSON.stringify(data));
  };
  const get_lead_sources = () => {
    axios
      .get(`${urls.lead_sources}`)
      .then((res) => {
        const { error, response, result } = res.data;
        // console.log(res.data);
        if (result) {
          set_lead_soursces(response);
          localStorage.setItem("lead_soursces", JSON.stringify(response));
        } else {
          console.log(error);
          alert("مشکلی در دریافت لید سورس ها پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const out_side_lead_soursce_setter = (data) => {
    set_lead_soursces(data);
    localStorage.setItem("lead_soursces", JSON.stringify(data));
  };
  const get_formulars = () => {
    axios
      .get(`${urls.formular}`)
      .then((res) => {
        const { error, response, result } = res.data;
        // console.log(res.data);
        if (result) {
          set_formular(response);
          localStorage.setItem("formular", JSON.stringify(response));
        } else {
          console.log(error);
          alert("مشکلی در دریافت فرمول ها پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const out_side_formular_setter = (data) => {
    set_formular(data);
    localStorage.setItem("formular", JSON.stringify(data));
  };
  const get_lead_packs = () => {
    axios
      .get(`${urls.lead_packs}`)
      .then((res) => {
        const { error, response, result } = res.data;
        // console.log(res.data);
        if (result) {
          set_lead_packs(response);
          localStorage.setItem("lead_packs", JSON.stringify(response));
        } else {
          console.log(error);
          alert("مشکلی در دریافت لیدپک ها پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const out_side_lead_packs_setter = (data) => {
    set_lead_packs(data);
    localStorage.setItem("lead_packs", JSON.stringify(data));
  };
  const get_sellers = () => {
    axios
      .get(`${urls.sellers}`)
      .then((res) => {
        const { error, response, result } = res.data;
        // console.log(res.data);
        if (result) {
          set_sellers(response);
          localStorage.setItem("sellers", JSON.stringify(response));
        } else {
          console.log(error);
          alert("مشکلی در دریافت فروشنده ها پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const get_seller_lead_packs = () => {
    axios
      .get(`${urls.seller_lead_packs}${user.id}`)
      .then((res) => {
        const { error, response, result } = res.data;
        // console.log(res.data);
        if (result) {
          set_seller_lead_pcaks(response);
          // console.log(response);
          localStorage.setItem("seller_lead_pcaks", JSON.stringify(response));
        } else {
          console.log(error);
          alert("مشکلی در دریافت اطلاعات لیدپک پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const get_call_results = () => {
    axios
      .get(`${urls.call_result}`)
      .then((res) => {
        const { error, response, result } = res.data;
        // console.log(res.data);
        if (result) {
          set_call_results(response);
          // console.log(response);
          localStorage.setItem("call_results", JSON.stringify(response));
        } else {
          console.log(error);
          alert("مشکلی در دریافت اطلاعات لیدپک پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const out_side_call_results_setter = (data) => {
    set_call_results(data);
    localStorage.setItem("call_results", JSON.stringify(data));
  };
  /* main apis */

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        kelasses,
        subjects,
        years,
        jalasat,
        teachers,
        sample_files,
        pay_info,
        get_info,
        doreha,
        courses,
        cart,
        handle_cart,
        senarios,
        out_side_senario_setter,
        lead_soursces,
        out_side_lead_soursce_setter,
        formular,
        out_side_formular_setter,
        lead_packs,
        out_side_lead_packs_setter,
        sellers,
        seller_lead_pcaks,
        call_results,
        out_side_call_results_setter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
