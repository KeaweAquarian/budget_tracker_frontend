import React from 'react';

const ViewBudget = (props) => {
	return (
		<>
			<div>Budget: £{props.budget}</div>
			<button type='button'  className='btn btn-primary' onClick={props.handleEditClick}>
				Save
			</button>
		</>
	);
};

export default ViewBudget;