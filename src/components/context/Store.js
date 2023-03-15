import React, { useState, useEffect } from 'react'
import { ApiContext } from './ApiContext';

function Store({ children }) {
//   const [isLoading, setIsLoading] = useState(false);
  const [expensesList , setExpensesList ] = useState([]);

    useEffect(() => {
      const getExpenses = async () => {
      const expensesFromServer = await fetchExpenses()
      setExpensesList(expensesFromServer)
    }

    getExpenses()
   
  }, [])


    // Fetch Expenses
  const fetchExpenses = async () => {
    const response=await fetch('http://localhost:5000/api/expenses');
        const body = await response.json();
        // setIsLoading(false);
    return body
  }
  return (
    <ApiContext.Provider value={[expensesList, setExpensesList]}>
      {children}
    </ApiContext.Provider>
  )
}
export default Store