import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Store from './components/context/Store';
import Category from './Category';
import Expsenses from './Expenses';
import Home from './home';





function App() {
  return (
    <Store>
    <Router>
      <Routes>
        <Route path='/' exact={true} element={<Home/>}/>
        <Route path='/categories' exact={true} element={<Category/>}/>
        <Route path='/expenses' exact={true} element={<Expsenses/>}/>
      </Routes>
    </Router>
    </Store>


  );
}

export default App;
