import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "./context/ApiContext";
import Moment from "react-moment";
import { Table, Container, Button } from "reactstrap";
import { useLocalState } from "../util/useLocalStorage";

const Expense = ({ chartOption }) => {
  const [expenseList, setExpenseList] = useContext(ApiContext);
  const [jwt] = useLocalState("", "jwt");
  const [windowDim, setWindowDim] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  //handle window resize
  const detectSize = () => {
    setWindowDim({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDim]);

  //Delete Expense
  const remove = async (id) => {
    console.log(id);
    console.log(jwt);
    const res = await fetch(
      `https://expensetracker-production-2788.up.railway.app/api/expenses/${id}`,
      {
        method: "DELETE",
        RequestMode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    console.log(res);

    let updatedExpenses = expenseList.filter((i) => i.id !== id);
    setExpenseList(updatedExpenses);
    console.log(id);
  };

  var list = expenseList;
  if (chartOption !== "all") {
    var newExpenseList = expenseList.filter(
      (e) => e.category.name === chartOption
    );
    list = newExpenseList;
  }

  let rows = list.map((expense) => (
    <tr key={expense.id}>
      <td>{expense.description}</td>
      {windowDim.winWidth > 700 && <td>{expense.location}</td>}
      {windowDim.winWidth > 700 && (
        <td>
          <Moment date={expense.expensedate} format="YYYY/MM/DD" />
        </td>
      )}
      {windowDim.winWidth > 500 && <td>{expense.category.name}</td>}
      <td>{expense.amount}</td>
      <td>
        <Button size="sm" color="danger" onClick={() => remove(expense.id)}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <Container>
      <h3>Expenses</h3>
      <Table className="mt-4">
        <thead>
          <tr>
            <th width="30%">Description</th>
            {windowDim.winWidth > 700 && <th width="10%">Location</th>}
            {windowDim.winWidth > 700 && <th> Date</th>}
            {windowDim.winWidth > 500 && <th> Category</th>}
            <th>Amount</th>
            <th width="10%">Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
};

export default Expense;
