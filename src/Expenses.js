import React, { Component, useState, useEffect} from 'react';
import AppNav from './appNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Table,Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddExpense from './components/AddExpense';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';




const Expenses = () => {
  const [emptyItem, setEmptyItem] = useState(
    {
        description : 'sgfh' ,
        expensedate : new Date(),
        // id:number,
        location : '',
        amount:0,
        category : {id:1 , name:'Travel'}
    }
  );
  const [budget, setBudget] = useState(20000);
  const [isLoading, setIsLoading] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [Expenses , setExpenses ] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);




    useEffect(() => {
    const getCategories = async () => {
      const categoriesFromServer = await fetchCategories()
      setCategories(categoriesFromServer)

    }
      const getExpenses = async () => {
      const expensesFromServer = await fetchExpenses()
      setExpenses(expensesFromServer)
      calculateTotalExpenses(expensesFromServer, 0)
      
     
    }

    getExpenses()
    getCategories()
   
  }, [])

  // Fetch Catagories
  const fetchCategories = async () => {
    const response=await fetch('http://localhost:5000/api/categories');
        const body = await response.json();
        setIsLoading(false);
    return body
  }

    // Fetch Expenses
  const fetchExpenses = async () => {
    const response=await fetch('http://localhost:5000/api/expenses');
        const body = await response.json();
        setIsLoading(false);
    return body
  }
  
   const handleBudget = ()=>{
      // this.setState({budget:value});
    //  console.log("hi")
    }

    const adjustEmptyItem= (e, a)=>{
          let idd = 0;
    let namee = "";
    // e.category.map((details=>(
      
    //     idd = details.id,
    //     namee =details.name
      
    // )))
    idd = e.category.id;
    namee =e.category.name;

    const item=({
        description : e.description ,
        expensedate : e.date,
        location : e.location,
        amount:e.amount,
        category : {id:idd , name:namee}
    })
    submitExpense(item, a)
    }

    //Add expense
   const submitExpense = async (item, a)=>{


    const res =  await fetch(`http://localhost:5000/api/expenses`, {
        method : 'POST',
        RequestMode:'no-cors',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(item),
      })
      const data =await res.json()
      setExpenses([...Expenses, data])
      
      calculateTotalExpenses(Expenses, a)

    }

        let rows=
            Expenses.map( expense =>
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                <td>{expense.category.name}</td>
                <td>{expense.amount}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>

              </tr>
            )
            const total = expenseTotal;
        const calculateTotalExpenses = (e, a)=> {
          let total = 0;
          e.forEach((expense)=>{
          total = total + expense.amount;
          })
          console.log(a)
          total = total + a;
          setExpenseTotal(total + a)
        

        }
                const calculateTotalExpenses2 = ()=> {
          let total = 0;
          Expenses.forEach((expense)=>{
          total = total + expense.amount;
          })
          
          setExpenseTotal(total)

        }

        



        return (
            <div >

          <AppNav/>
            <div className='container'>
           <div className='row mt-3'>
					<div className='col-sm'>
						<Budget budget = {Math.round(budget * 100) / 100} budgetChange={handleBudget()} />
					</div>
					<div className='col-sm'>
						<Remaining remaining={Math.round((budget-expenseTotal) * 100) / 100}/>
					</div>
					<div className='col-sm'>
						<ExpenseTotal total={Math.round(total * 100) / 100 }/>
					</div>
				</div>
               </div>

          <AddExpense submitExpense={adjustEmptyItem} categories={Categories} totalExpense={setExpenseTotal}/>
          

              <Container>
                <h3>Expense List</h3>
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
                <tbody>
                   {rows}
                </tbody>

                </Table>
              </Container>
          

        </div>

        );
}

export default Expenses


// class Expsenses extends Component {

 
    
 
//     emptyItem = {
//         description : '' ,
//         expensedate : new Date(),
//         // id:number,
//         location : '',
//         amount:0,
//         category : {id:101 , name:'Travel'}
//     }

    
//     constructor(props){
//       super(props)

//       this.state = { 
//         budget:2000,
//         isLoading :false,
//         Categories:[],
//         Expsenses : [],
//         date :new Date(),
//         item : this.emptyItem
//        }

//        this.handleSubmit= this.handleSubmit.bind(this);
//        this.handleChange= this.handleChange.bind(this);
//        this.handleDateChange= this.handleDateChange.bind(this);
//        this.handleBudget= this.handleBudget.bind(this);


//     } 

//     handleBudget(value){
//       // this.setState({budget:value});
//       console.log(value.props)
//     }

//     async handleSubmit(event){
//       const item = this.state.item;
//       event.preventDefault();
   
//       console.log(item)

//       await fetch(`http://localhost:5000/api/expenses`, {
//         method : 'POST',
//         RequestMode:'no-cors',
//         headers : {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body : JSON.stringify(item),
//       });
      
//       // window.location.reload();
//       // this.props.history.push("http://localhost:5000/api/expenses");
//     }


//     handleChange(event){
//       const target= event.target;
//       const value= target.value;
//       const name = target.name;
//       let item={...this.state.item};
//       item[name] = value;
//       this.setState({item});
      
//     }


//     handleDateChange(date){
//       let item={...this.state.item};
//       item.expensedate= date;
//       this.setState({item});
    
//     }

  






//     async remove(id){
//         await fetch(`http://localhost:5000/api/expenses/${id}` , {
//           method: 'DELETE' ,
//           RequestMode:'no-cors',
//           headers : {
//             'Accept' : 'application/json',
//             'Content-Type' : 'application/json'
//           }

//         }).then(() => {
//           let updatedExpenses = [...this.state.Expsenses].filter(i => i.id !== id);
//           this.setState({Expsenses : updatedExpenses});
//         });

//     }


//     async componentDidMount() {
 
     

//         const response= await fetch('http://localhost:5000/api/categories');
//         const body= await response.json();
//         this.setState({Categories : body , isLoading :false});


//         const responseExp= await fetch('http://localhost:5000/api/expenses');
//         const bodyExp = await responseExp.json();
//         this.setState({Expsenses : bodyExp , isLoading :false});
       

//     }





//     render() { 
         
//         const title =<h3>Add Expense</h3>;
//         const {Categories} =this.state;
//         const {Expsenses,isLoading} = this.state;
        

//         if (isLoading)
//             return(<div>Loading....</div>)
        


//         let optionList  =
//                 Categories.map( (category) =>
//                     <option value={category.id} key={category.id}>
//                                 {category.name} 
//                     </option>
//                 )
        
//         let rows=
//             Expsenses.map( expense =>
//               <tr key={expense.id}>
//                 <td>{expense.description}</td>
//                 <td>{expense.location}</td>
//                 <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
//                 <td>{expense.category.name}</td>
//                 <td>{expense.amount}</td>
//                 <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>

//               </tr>
//             )
//   //           let total = 0;
//   //            Expsenses.map(exspence =>
//   //             total = total + exspence.amount,
              
//   //            )

        

//   //         const total = Expsenses.reduce((total, item) => {
// 	// 	return (total += item.amount);
// 	// }, 0);

//         return (
//             <div >

//                 <AppNav/>
//             <div className='container'>
//            <div className='row mt-3'>
// 					<div className='col-sm'>
// 						<Budget budget = {this.state.budget} budgetChange={()=> this.handleBudget()} />
// 					</div>
// 					<div className='col-sm'>
// 						<Remaining />
// 					</div>
// 					<div className='col-sm'>
// 						<ExpenseTotal total={22}/>
// 					</div>
// 				</div>
//                </div>
                
//                 <Container>
//                     {title}
                    
//                     <Form onSubmit={this.handleSubmit}>
//                     <FormGroup>
//                         <Label for="description">Title</Label>
//                         <Input type="description" name="description" id="description" 
//                             onChange={this.handleChange} autoComplete="name"/>
                    
//                     </FormGroup>

//                     <FormGroup>
//                         <Label for="category" >Category</Label>
//                         <select onChange={this.handleChange}>
//                                 {optionList}
//                         </select>
                    
//                     </FormGroup>

//                     <FormGroup>
//                         <Label for="expensedate">Date</Label>
//                         <DatePicker    selected={this.state.item.expensedate}  onChange={this.handleDateChange} />
//                     </FormGroup>

//                     <div className="row">
//                         <FormGroup className="col-md-4 mb-3">
//                         <Label for="location">Location</Label>
//                         <Input type="text" name="location" id="location" onChange={this.handleChange}/>
//                         </FormGroup>
                      
//                     </div>
//                       <div className="row">
//                         <FormGroup className="col-md-4 mb-3">
//                         <Label for="amount">Amount</Label>
//                         <Input type="number" name="amount" id="amount" onChange={this.handleChange}/>
//                         </FormGroup>
                      
//                     </div>
//                     <FormGroup>
//                         <Button color="primary" type="submit">Save</Button>{' '}
//                         <Button color="secondary" tag={Link} to="/">Cancel</Button>
//                     </FormGroup>
//                     </Form>
//                 </Container>
              

//           {''}
//               <Container>
//                 <h3>Expense List</h3>
//                 <Table className="mt-4">
//                 <thead>
//                   <tr>
//                     <th width="30%">Description</th>
//                     <th width="10%">Location</th>
//                     <th> Date</th>
//                     <th> Category</th>
//                     <th>Amount</th>
//                     <th width="10%">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                    {rows}
//                 </tbody>

//                 </Table>
//               </Container>

          

//         </div>

//         );
//     }
// }
 
// export default Expsenses;