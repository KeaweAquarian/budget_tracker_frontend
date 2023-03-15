import React from 'react';

const Remaining = ({remaining}) => {
	
	const balanceAlert= remaining > 0 ?  'alert-success' : 'alert-danger'
	return (
		<div className={`alert ${balanceAlert} p-3`} style={{height:"60px"}}>
			<div>Remaining: $ {remaining} </div>
		</div>
	);
};

export default Remaining;
