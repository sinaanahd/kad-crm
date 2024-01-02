import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DataContext } from "../../data/datacontext";
import axios from "axios";
import urls from "../../../urls/url";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";

const studentData = [
  { date: "2023-08-29", students: 10 },
  { date: "2023-09-01", students: 0 },
  { date: "2023-09-02", students: 20 },
  { date: "2023-09-03", students: 0 },
  { date: "2023-09-04", students: 25 },
  { date: "2023-09-05", students: 0 },
  { date: "2023-09-06", students: 28 },
  { date: "2023-09-07", students: 0 },
  { date: "2023-09-08", students: 8 },
  // Add more data for the past days
];

const getLastThreeDaysData = (data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 2); // Go back three days
  return data;
  //   return data.filter((entry) => new Date(entry.date) >= threeDaysAgo);
};
const ref_payments = JSON.parse(localStorage.getItem("payments")) || false;
const Diagram = () => {
  const [payments, set_payments] = useState(ref_payments);
  const get_data = () => {
    // console.log("start");
    if (!payments) {
      axios
        .get(urls.accounting_payments)
        .then((res) => {
          const { result, response, error } = res.data;
          if (result) {
            // console.log(response);
            localStorage.setItem("payments", JSON.stringify(response));
            set_payments(response);
          } else {
            console.log(error);
            // alert("مشکلی پیش آمده");
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  useEffect(() => {
    get_data();
  }, []);
  const make_data = () => {
    // console.log(payments[0]);
    // const payment = payments[0];
    const datas = [];
    const sellers = [];
    payments.forEach((payment) => {
      if (
        !sellers.includes(payment.seller_name) &&
        payment.seller_name !== "-" &&
        payment.seller_name !== "سایت"
      ) {
        sellers.push(payment.seller_name);
      }
    });
    sellers.forEach((s) => {
      const seller_payments = payments.filter(
        (p) => p.seller_name === s && p.is_payed
      );
      let sum = 0;
      let selled_products = 0;
      seller_payments.forEach((p) => {
        sum += p.payment_amount;
        selled_products += p.products_ids.length;
      });
      const data = {
        name: s,
        amount: sum / 1000,
        product_counts: selled_products,
        persian_amount: split_in_three(convert_to_persian(sum)),
      };
      datas.push(data);
    });
    return datas;
  };
  const pay_datas = payments ? make_data() : false;
  const colors = ["orange", "blue", "green", "red", "pink", "magenta"];
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
      <ResponsiveContainer width="50%" height={400}>
        <BarChart width={600} height={300} data={pay_datas}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis dataKey="amount" />
          <Bar dataKey="amount" barSize={20} fill="#8884d8" />
          <Tooltip content={CustomTooltip} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="50%" height={400}>
        <PieChart>
          <Pie
            data={pay_datas}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          >
            {pay_datas ? (
              pay_datas.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))
            ) : (
              <></>
            )}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Diagram;
