import React, { useState, useContext, useEffect} from 'react';
import Expsenses from '../Expenses';
import { ApiContext } from './context/ApiContext';
const ExpenseTotal = () => {

	 const [expensesList, setExpensesList] = useContext(ApiContext)
     const [expenseTotal, setExpenseTotal] = useState(0);


useEffect(() => {
    calculateTotalExpenses()
  }, [expensesList])

    
        const calculateTotalExpenses = ()=> {
          let total = 0;
          expensesList.forEach((expense)=>{
          total = total + expense.amount;
          })       
          setExpenseTotal(total)
        }
	
	return (
		
		<div className='alert alert-primary p-3' style={{height:"60px"}}>
			<div>Exspense total ${expenseTotal.toFixed(2)}</div>
		</div>
	);
};

export default ExpenseTotal;
