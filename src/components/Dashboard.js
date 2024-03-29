import React, { useState, useEffect } from "react";
import AppNav from "../AppNav";
import Chart from "react-apexcharts";
import { ApiContext } from "./context/ApiContext";
import { useContext } from "react";
import { Container } from "reactstrap";
import Expense from "./Expense";
import AppNavHor from "./AppNavHor";

const Dashboard = () => {
  const [lables, setLables] = useState(false);
  const [expenseList] = useContext(ApiContext);
  const [chartOption, setChartOption] = useState("all");
  const [windowDim, setWindowDim] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  //handle window resize
  const detectSize = () => {
    if (window.innerWidth < 750) {
      setLables(false);
    } else setLables(true);
    setWindowDim({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };
  useEffect(() => {
    detectSize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDim]);

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
    <div style={{ backgroundColor: "#EEF5F7", paddingBottom: "5px" }}>
      {windowDim.winWidth < 800 && <AppNavHor />}
      <div
        className="d-flex"
        style={{
          backgroundColor: "#EEF5F7",
          height: "100%",
        }}
      >
        {windowDim.winWidth > 800 && <AppNav />}
        <Container
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <div
            className="container-fluid mt-3 mb-3"
            style={{
              maxWidth: 800,
              maxHeight: 800,
              // minWidth: 300,
              minHeight: 200,
            }}
          >
            <h2 className="text-left">Project Expenses</h2>
            <Chart
              // width={windowDim.winWidth * 0.6}
              // height={windowDim.winWidth * 0.6}
              // maxHeight={600}
              // minWidth={600}
              type="donut"
              series={amounts}
              options={{
                // minWidth: 400,
                // minHeight: 400,

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
                        show: lables,
                        total: {
                          show: lables,
                          showAlways: true,
                          formatter: function (w) {
                            let result = w.globals.seriesTotals.reduce(
                              (a, b) => a + b,
                              0
                            );
                            return Math.round(result * 100) / 100; // * 100 for 2 decimal numbers
                          },
                          fontSize: 30,
                          color: "#f90000",
                        },
                      },
                    },
                  },
                },
                legend: {
                  show: lables,
                },

                dataLabels: {
                  enabled: lables,
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
