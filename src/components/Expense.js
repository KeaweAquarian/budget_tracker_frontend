import React, { useContext } from "react";
import { ApiContext } from "./context/ApiContext";
import Moment from "react-moment";
import { Table, Container, Button } from "reactstrap";

const Expense = ({ remove, chartOption }) => {
  const [expensesList, setExpenseList] = useContext(ApiContext);

  var list = expensesList;
  if (chartOption !== "all") {
    var newExpenseList = expensesList.filter(
      (e) => e.category.name === chartOption
    );
    list = newExpenseList;
  }

  let rows = list.map((expense) => (
    <tr key={expense.id}>
      <td>{expense.description}</td>
      <td>{expense.location}</td>
      <td>
        <Moment date={expense.expensedate} format="YYYY/MM/DD" />
      </td>
      <td>{expense.category.name}</td>
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
            <th width="10%">Location</th>
            <th> Date</th>
            <th> Category</th>
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
