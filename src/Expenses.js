import React, { useState, useEffect, useContext } from "react";
import AppNav from "./appNav";
import "react-datepicker/dist/react-datepicker.css";
import Budget from "./components/Budget";
import Remaining from "./components/Remaining";
import ExpenseTotal from "./components/ExpenseTotal";
import "bootstrap/dist/css/bootstrap.min.css";
import AddExpense from "./components/AddExpense";
import { ApiContext } from "./components/context/ApiContext";
import Expense from "./components/Expense";
import AddButton from "./components/AddButton";
import { useLocalState } from "./util/useLocalStorage";

const Expenses = () => {
  const [budget, setBudget] = useState(20000);
  // const [isLoading, setIsLoading] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [expenseList, setExpenseList] = useContext(ApiContext);
  const [show, setShow] = useState(false);
  const [jwt] = useLocalState("", "jwt");

  useEffect(() => {
    const getCategories = async () => {
      // Fetch Catagories
      const fetchCategories = async () => {
        const response = await fetch("http://localhost:5000/api/categories", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });
        const body = await response.json();

        // setIsLoading(false);
        return body;
      };

      const categoriesFromServer = await fetchCategories();
      setCategories(categoriesFromServer);
    };
    getCategories();
  }, [jwt]);

  const handleBudget = (value) => {
    setBudget(value);
  };

  const adjustEmptyItem = (e) => {
    let idd = 0;
    let namee = "";

    idd = e.category.id;
    namee = e.category.name;

    const item = {
      description: e.description,
      expensedate: e.date,
      location: e.location,
      amount: e.amount,
      category: { id: idd, name: namee },
    };
    submitExpense(item);
  };

  //Add expense
  const submitExpense = async (item) => {
    const res = await fetch(`http://localhost:5000/api/expenses`, {
      method: "POST",
      RequestMode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    setExpenseList([...expenseList, data]);
  };

  //Delete Expense
  const remove = async (id) => {
    await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
      RequestMode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    let updatedExpenses = expenseList.filter((i) => i.id !== id);
    setExpenseList(updatedExpenses);
  };

  //Toggle show add form

  const changeShow = () => {
    setShow(!show);
  };
  return (
    <>
      <div
        className="d-flex"
        style={{ backgroundColor: "#EEF5F7", height: "100vh" }}
      >
        <AppNav />
        <div
          className="p-2 flex-fill"
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            marginRight: "20px",
          }}
        >
          <div className="container">
            <div className="row mt-3">
              <div className="col-sm">
                <Budget
                  budget={Math.round(budget * 100) / 100}
                  budgetChange={handleBudget}
                />
              </div>
              <div className="col-sm">
                <Remaining budget={budget} />
              </div>
              <div className="col-sm">
                <ExpenseTotal />
              </div>
            </div>
          </div>

          {show ? (
            <AddExpense
              submitExpense={adjustEmptyItem}
              categories={Categories}
              changeShow={changeShow}
            />
          ) : (
            <AddButton changeShow={changeShow} />
          )}
          <Expense remove={remove} />
        </div>
      </div>
    </>
  );
};

export default Expenses;
