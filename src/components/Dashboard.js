import React, { useState } from "react";
import AppNav from "../appNav";
import Chart from "react-apexcharts";
import { ApiContext } from "./context/ApiContext";
import { useContext } from "react";
import { Container } from "reactstrap";
import Expense from "./Expense";

const Dashboard = () => {
  const [expenseList] = useContext(ApiContext);
  const [chartOption, setChartOption] = useState("all");

  let items = new Map();

  for (let i = 0; i < expenseList.length; i++) {
    if (items.has(expenseList[i].category.name)) {
      items.set(
        expenseList[i].category.name,
        items.get(expenseList[i].category.name) +
          parseFloat(expenseList[i].amount)
      );
    } else {
      items.set(
        expenseList[i].category.name,
        parseFloat(expenseList[i].amount)
      );
    }
  }
  let category = Array.from(items.keys());
  let amounts = Array.from(items.values());

  return (
    <div style={{ backgroundColor: "#EEF5F7" }}>
      <div
        className="d-flex"
        style={{ backgroundColor: "#EEF5F7", height: "90vh" }}
      >
        <AppNav />
        <Container
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            marginRight: "20px",
          }}
        >
          <div className="container-fluid mt-3 mb-3">
            <h2 className="text-left">Project Expenses</h2>
            <Chart
              type="donut"
              width={1000}
              height={450}
              series={amounts}
              options={{
                chart: {
                  events: {
                    dataPointSelection: (event, chartContext, config) => {
                      setChartOption(
                        config.w.config.labels[config.dataPointIndex]
                      );
                    },
                  },
                },
                labels: category,
                title: {
                  text: "Current Expenses",
                  // align:"center",
                },

                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          showAlways: true,
                          //formatter: () => '343',
                          fontSize: 30,
                          color: "#f90000",
                        },
                      },
                    },
                  },
                },

                dataLabels: {
                  enabled: true,
                },
              }}
            />
          </div>
        </Container>
      </div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          margin: "20px",
          backgroundColor: "white",
        }}
      >
        <Expense chartOption={chartOption} />
      </div>
    </div>
  );
};

export default Dashboard;
