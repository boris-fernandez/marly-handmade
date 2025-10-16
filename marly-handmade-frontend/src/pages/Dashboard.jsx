import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import AdminSidebar from "../components/AdminSidebar.jsx";

// Funciones de servicio integradas
const API_BASE_URL = "http://localhost:3001/api"; // Cambiar cuando tengas backend desplegado

const getDashboardData = async () => {
  try {
    // TODO: Cuando tengas el backend listo, descomenta esto:
    // const response = await fetch(`${API_BASE_URL}/dashboard`);
    // if (!response.ok) throw new Error('Error fetching dashboard data');
    // return await response.json();

    // Por ahora retornamos datos simulados (mock data)
    return {
      salesByRep: [
        { name: "Ana García", sales: 250 },
        { name: "Carlos López", sales: 180 },
        { name: "María Torres", sales: 220 },
        { name: "Juan Pérez", sales: 280 },
        { name: "Laura Ruiz", sales: 240 },
      ],
      funnelData: [
        { stage: "Qualified", value: 100, percentage: 100 },
        { stage: "Proposed", value: 75, percentage: 75 },
        { stage: "Negotiation", value: 50, percentage: 50 },
        { stage: "Contract", value: 35, percentage: 35 },
        { stage: "Win", value: 27, percentage: 27 },
      ],
      averageValue: 128100,
      pipelineData: [
        { name: "Won", value: 40, color: "#333" },
        { name: "Contract", value: 25, color: "#666" },
        { name: "Proposed", value: 20, color: "#999" },
        { name: "Negotiation", value: 15, color: "#ccc" },
      ],
      monthlyGoal: { current: 6200000, goal: 8100000 },
    };
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    throw error;
  }
};

function Dashboard() {
  // Estados para almacenar los datos dinámicos
  const [salesByRep, setSalesByRep] = useState([]);
  const [funnelData, setFunnelData] = useState([]);
  const [averageValue, setAverageValue] = useState(0);
  const [pipelineData, setPipelineData] = useState([]);
  const [monthlyGoal, setMonthlyGoal] = useState({ current: 0, goal: 0 });
  const [loading, setLoading] = useState(true);

  // Función para cargar datos desde la API
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Importar el servicio en la parte superior del componente:
      // import * as dashboardService from '../services/dashboardService';

      // Opción 1: Cargar todos los datos de una vez
      // const data = await dashboardService.getDashboardData();

      // Opción 2: Cargar datos individualmente (más flexible)
      // const [sales, funnel, avg, pipeline, goal] = await Promise.all([
      //   dashboardService.getSalesByRep(),
      //   dashboardService.getFunnelData(),
      //   dashboardService.getAverageValue(),
      //   dashboardService.getPipelineData(),
      //   dashboardService.getMonthlyGoal()
      // ]);

      // Por ahora usamos datos mock directamente
      const mockData = {
        salesByRep: [
          { name: "Ana García", sales: 250 },
          { name: "Carlos López", sales: 180 },
          { name: "María Torres", sales: 220 },
          { name: "Juan Pérez", sales: 280 },
          { name: "Laura Ruiz", sales: 240 },
        ],
        funnelData: [
          { stage: "Qualified", value: 100, percentage: 100 },
          { stage: "Proposed", value: 75, percentage: 75 },
          { stage: "Negotiation", value: 50, percentage: 50 },
          { stage: "Contract", value: 35, percentage: 35 },
          { stage: "Win", value: 27, percentage: 27 },
        ],
        averageValue: 128100,
        pipelineData: [
          { name: "Won", value: 40, color: "#4F8DFD" }, // azul brillante - éxito
          { name: "Contract", value: 25, color: "#2D6CDF" }, // azul fuerte
          { name: "Proposed", value: 20, color: "#0A2E8A" }, // azul profundo
          { name: "Negotiation", value: 15, color: "#051847" }, // azul casi negro - inicio del pipeline
        ],

        monthlyGoal: { current: 6200000, goal: 8100000 },
      };

      setSalesByRep(mockData.salesByRep);
      setFunnelData(mockData.funnelData);
      setAverageValue(mockData.averageValue);
      setPipelineData(mockData.pipelineData);
      setMonthlyGoal(mockData.monthlyGoal);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const goalPercentage = (monthlyGoal.current / monthlyGoal.goal) * 100;

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "20px",
          color: "#040F2F",
        }}
      >
        Cargando datos...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "40px",
          backgroundColor: "#f5f5f5",
          marginLeft: "230px",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "30px",
            color: "#040F2F",
            fontWeight: "400",
          }}
        >
          Sales Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          {/* Sales by Rep - Gráfico de Barras Real */}
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#040F2F",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Sales by Rep
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesByRep}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#040F2F" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Funnel Chart */}
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#040F2F",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Funnel Chart
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: "220px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  flex: 1,
                }}
              >
                {funnelData.map((item, i) => (
                  <div key={i} style={{ marginBottom: "5px" }}>
                    <div
                      style={{
                        height: "35px",
                        width: `${item.percentage}%`,
                        backgroundColor: [
                          "#6FB8FF",
                          "#3A91FF",
                          "#206CFF",
                          "#0A49D1",
                          "#03206F",
                        ][i],
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "15px",
                        color: "white",
                        fontSize: "13px",
                        borderRadius: "3px",
                      }}
                    >
                      {item.stage}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  textAlign: "right",
                  paddingLeft: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    color: "#040F2F",
                  }}
                >
                  {funnelData[funnelData.length - 1]?.percentage || 27}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#040F2F",
                  }}
                >
                  Conversión
                </div>
              </div>
            </div>
          </div>

          {/* Average Value */}
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#040F2F",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Average Value of Won Deals
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "180px",
                fontSize: "56px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {formatCurrency(averageValue)}
            </div>
          </div>

          {/* Sales Pipeline - Gráfico Circular Real */}
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#040F2F",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Sales Pipeline
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "180px",
              }}
            >
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={pipelineData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "14px",
                }}
              >
                {pipelineData.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: item.color,
                      }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Goal */}
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              gridColumn: "span 2",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#040F2F",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Monthly Goal
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              <span style={{ color: "#040F2F" }}>
                {formatCurrency(monthlyGoal.current)}
              </span>
              <span style={{ color: "#040F2F", fontSize: "16px" }}>
                Goal {formatCurrency(monthlyGoal.goal)}
              </span>
            </div>
            <div
              style={{
                height: "40px",
                background: "#e0e0e0",
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${goalPercentage}%`,
                  background: "#040F2F",
                  borderRadius: "20px",
                  transition: "width 0.5s ease",
                }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
