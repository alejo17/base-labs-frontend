import axios from "axios";

import { useEffect, useState } from "react";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const BACKEND = import.meta.env.VITE_BACKEND_URL
const colors = [
  "#0088FE",
  "#198D17",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#8FF3B5",
  "#47FBEF",
  "#FF0000",
];
const styles = {
  page: {
    padding: "30px",
    background: "#f5f7fb",
    minHeight: "100vh",
    fontFamily: "Arial"
  },
  title: {
    marginBottom: "30px"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "40px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
  }
};


export default function Dashboard() {

  const [data, setData] = useState([]);
  const [dataNegative, setDataNegative] = useState([]);

  useEffect( () => {
    axios.get(
      BACKEND+"get-top-ten/",
      { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect( () => {
    axios.get(
      BACKEND+"get-negative-margin/",
      { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then(response => {
        setDataNegative(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);



  return (
    <div style={styles.page}>

      <h1 style={styles.title}>Dashboard</h1>

      <div style={styles.card}>
        <h2>Top 10 Products - Profit</h2>

        <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="brand"
            interval={0}
            angle={-35}
            textAnchor="end"
            height={150}
          />

          <YAxis width={100}/>
          <Tooltip />

          <Bar dataKey="profit" radius={[6,6,0,0]}>
            {dataNegative.map((_entry, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.card}>
        <h2>Worst Margin Products (30)</h2>

        <ResponsiveContainer width="100%" height={350}>
        <BarChart data={dataNegative}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="brand"
            tick={false}
          />

          <YAxis />
          <Tooltip />

          <Bar dataKey="margin" radius={[6,6,0,0]}>
            {dataNegative.map((_entry, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );

}