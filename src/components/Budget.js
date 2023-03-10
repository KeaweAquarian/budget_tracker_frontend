

import React, { useState } from 'react';
import ViewBudget from './ViewBudget';
import EditBudget from './EditBudget';
// import { AppContext } from '../context/AppContext';

const Budget = (props) => {
	// const { budget, changeBudget } = useState(2000);
	const [budget, setBudget] = useState(0);
	const [isEditing, setIsEditing] = useState(false);
    
	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = (value) => {
        console.log(value)
	    props.budgetChange(value);
		setIsEditing(false);
	};

	return (
		<div className='alert alert-secondary p-2 d-flex align-items-center justify-content-between' style={{height:"60px"}}>
			{isEditing ? (
				<EditBudget handleSaveClick={handleSaveClick}  />
			) : (
				// For part 1 render component inline rather than create a seperate one
				<ViewBudget handleEditClick={handleEditClick} budget={props.budget} />
			)}
		</div>
	);
};

export default Budget;