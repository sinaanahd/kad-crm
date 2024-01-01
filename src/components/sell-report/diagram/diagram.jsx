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
} from "recharts";
import { DataContext } from "../../data/datacontext";
import axios from "axios";
import urls from "../../../urls/url";

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
            console.log(response);
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
  const make_data = () => {};
  const pay_datas = payments ? make_data() : false;
  const data = [
    { name: "Page A", uv: 400, pv: 2100, amt: 1000 },
    { name: "Page B", uv: 100, pv: 2300, amt: 2000 },
    { name: "Page C", uv: 500, pv: 2440, amt: 2200 },
    { name: "Page D", uv: 250, pv: 250, amt: 200 },
    { name: "Page E", uv: 300, pv: 2200, amt: 2100 },
    { name: "Page E", uv: 300, pv: 2200, amt: 2100 },
    { name: "Page E", uv: 300, pv: 2200, amt: 2100 },
    { name: "Page E", uv: 300, pv: 2200, amt: 2100 },
    { name: "Page E", uv: 300, pv: 2200, amt: 2100 },
    { name: "Page E", uv: 300, pv: 2200, amt: 2100 },
    { name: "Page E", uv: 300, pv: 2200, amt: 2100 },
  ];
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="pv" barSize={50} fill="#8884d8" />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
        </BarChart>
      </ResponsiveContainer>

      {/* <ResponsiveContainer width="100%" height={400}>
        <LineChart data={lastThreeDaysData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="stepBefore" dataKey="students" stroke="#000" dot={true} />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>

      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>

      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>

      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>

      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart> */}
    </div>
  );
};

export default Diagram;
