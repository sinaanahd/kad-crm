import React, { useState, useEffect, useContext } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import check_period from "../../functions/check-period";
import { DataContext } from "../../data/datacontext";
const LastTwoMonthDiagrams = () => {
  useEffect(() => {
    const data_1 = detect_time_period("now");
    const data_2 = detect_time_period("last");
    // console.log(data_1, data_2);
  }, []);
  const { all_payments } = useContext(DataContext);
  const make_data = (base_start, base_end) => {
    const datas = [];
    const sellers = [];
    all_payments.forEach((payment) => {
      if (
        !sellers.includes(payment.seller_name) &&
        payment.seller_name !== "-"
      ) {
        sellers.push(payment.seller_name);
      }
    });
    sellers.forEach((s) => {
      const seller_payments = all_payments.filter((p) =>
        p.seller_name === s &&
        p.is_payed &&
        p.paying_datetime &&
        p.manager_confirmation
          ? check_period(base_start, base_end, p.paying_datetime)
          : false
      );
      let sum = 0;
      let selled_products = 0;
      seller_payments.forEach((p) => {
        sum += p.payment_amount;
        selled_products += p.products_ids.length;
      });
      const data = {
        name: s,
        amount: sum / 1000000,
        product_counts: selled_products,
        persian_amount: split_in_three(convert_to_persian(sum)),
      };
      datas.push(data);
    });
    return datas;
  };
  const detect_time_period = (state) => {
    const start = {
      day: "",
      month: "",
      year: "",
    };
    const finsish = {
      day: "",
      month: "",
      year: "",
    };
    const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    let [year, month, day] = new Date().toLocaleDateString("fa-ir").split("/");
    year = p2e(year);
    month = p2e(month);
    day = p2e(year);
    if (state === "last") {
      if (month !== 1) {
        month = month - 1;
      } else {
        month = 12;
        year = year - 1;
      }
    }
    if (month <= 6) {
      start.day = 1;
      finsish.day = 31;
      start.month = month;
      finsish.month = month;
      start.year = year;
      finsish.year = year;
    } else if (month > 6) {
      start.day = 1;
      finsish.day = 30;
      start.month = month;
      finsish.month = month;
      start.year = year;
      finsish.year = year;
    }
    const time_arrs = [
      `${start.day}/${start.month}/${start.year}`,
      `${finsish.day}/${finsish.month}/${finsish.year}`,
    ];
    return time_arrs;
  };
  const [time1, time2] = detect_time_period("now");
  //   console.log(time1, time2);
  const this_month_pay_data = all_payments ? make_data(time1, time2) : false;
  const [time3, time4] = detect_time_period("last");
  //   console.log(time3, time4);
  const last_month_pay_data = all_payments ? make_data(time3, time4) : false;
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {`${label} : ${payload[0].payload.persian_amount}`} تومان
          </p>
          <span className="sold-prods">
            محصول فروخته شده :{" "}
            {convert_to_persian(payload[0].payload.product_counts)}
          </span>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={600} height={300} data={this_month_pay_data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis dataKey="amount" />
          <Bar dataKey="amount" barSize={20} fill="#57298A" />
          <Tooltip content={CustomTooltip} fill="#fff" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={600} height={300} data={last_month_pay_data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis dataKey="amount" />
          <Bar dataKey="amount" barSize={20} fill="#57298A" />
          <Tooltip content={CustomTooltip} fill="#fff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LastTwoMonthDiagrams;
