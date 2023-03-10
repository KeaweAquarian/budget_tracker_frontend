import React, { useEffect } from 'react';
import AppNav from './appNav';
import { useState} from 'react';
import EditCategory from './components/EditCategory';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteButton from './components/DeleteButton';



const Category = () => {
  
    const [isLoading, setIsLoading] = useState(true);
    const [Categories, setCatagories] = useState([]);


    // const handleSaveClick = (category) => {
    //     addCatagory(category)
		
	// };

    useEffect(() => {
    const getCategories = async () => {
      const categoriesFromServer = await fetchTasks()
      setCatagories(categoriesFromServer)
    }

    getCategories()
  }, [])

  // Fetch Catagories
  const fetchTasks = async () => {
    const response=await fetch('http://localhost:5000/api/categories');
        const body = await response.json();
        setIsLoading(false);

    return body
  }

  // Add Catagory
  const addCatagory = async(category) => {
  
    const res = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body:JSON.stringify(category),
        })
        console.log(res)
       {const getCategories = async () => {
      const categoriesFromServer = await fetchTasks()
      setCatagories(categoriesFromServer)
    }

    getCategories()}
    }

      // Delete Catagory
  const deleteCatagory = async(id) => {
    
    const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body:JSON.stringify(id),
        })
        if(res.status !== 200){
            alert("Categories with active expenses cannot be deleted!")
        }

        {const getCategories = async () => {
      const categoriesFromServer = await fetchTasks()
      setCatagories(categoriesFromServer)
    }

    getCategories()}
        
    }
  
           

if(isLoading) 
            return (
            <div>
                <AppNav />
                Loading...
                </div>);
        
        return ( 
            
                <div >
                   <AppNav />
                   <div style={{marginLeft:"30px"}}>
                    <h2>Categories</h2>
            <div className='alert alert-secondary p-2 d-flex align-items-center justify-content-between' style={{width:"200px"}}>

				<EditCategory onAdd={addCatagory}  />

		</div>
                     <ListGroup as="ol" style={{"width":'400px'}} >
                    
                    {
                       
                        Categories.map( category => 
                            <ListGroup.Item as="li"  key={category.id} >
                            
                                {category.name}
                            <DeleteButton deletecatagory={deleteCatagory} id={category.id}/>    
                            
                            </ListGroup.Item>

                        )
                        
                        }
                        </ListGroup>
                   </div>


                </div>
         );
}

export default Category


