import {React, useState} from 'react';
import Expsenses from '../Expenses';

const ExpenseTotal = (props) => {
	
	

	// console.log(props)

	// setTotal(props.reduce((a,v) =>  a = a + v.amount , 0 ))
	

// props.map((order) => {
// setTotal(total + order.carttotal)}
    
//    let sum = 0
// props.map(e => sum += e)
// console.log(sum);
	
	return (
		
		<div className='alert alert-primary p-3' style={{height:"60px"}}>
			<div>Exspense total ${props.total}</div>
		</div>
	);
};

export default ExpenseTotal;
