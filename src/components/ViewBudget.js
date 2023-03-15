import React from 'react';

const ViewBudget = ({budget, handleEditClick}) => {
	return (
		<>
			<div>Budget: ${budget}</div>
			<button type='button'  className='btn btn-primary' onClick={handleEditClick}>
				Edit
			</button>
		</>
	);
};

export default ViewBudget;