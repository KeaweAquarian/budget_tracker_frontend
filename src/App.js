import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Store from './components/context/Store';
import Category from './Category';
import Expenses from './Expenses';
import Home from './home';
import Auth from './components/Auth';
import { useEffect, useState } from 'react';
import { useLocalState } from './util/useLocalStorage';




function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");


  useEffect(() => {
    if (true) {
      const reqBody = {
        username: "jan",
        password: "1234",
      };
      var formBody = [];
for (var property in reqBody) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(reqBody[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

    //Get login token


    const login = async (formBody) =>{
       console.log("hi1");
     const res = await fetch("http://localhost:5000/api/login", {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
        },
        method: "POST",
        body: formBody
      })
      
      const data = await res.json()
      setJwt(data.access_token)
      
    }
    login(formBody)
  }
  
  }, []);

  return (
    <Store>
    <Router>
      <Routes>      
        <Route path="/auth" element={<Auth />} />
        <Route path='/' exact={true} element={<Expenses/>}/>
        <Route path='/categories' exact={true} element={<Category/>}/>
        <Route path='/about' exact={true} element={<Home/>}/>
      </Routes>
    </Router>
    </Store>


  );
}

export default App;
