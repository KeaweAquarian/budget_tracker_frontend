import React from 'react';

const Remaining = (props) => {
	let remaining = props.budget;
	const balanceAlert= props.Remaining > 0 ?  'alert-success' : 'alert-danger'
	return (
		<div className={`alert ${balanceAlert} p-3`} style={{height:"60px"}}>
			<div>Remaining: </div>
		</div>
	);
};

export default Remaining;
