import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Category from './Category';
import Home from './home';





function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' exact={true} element={<Home/>}/>
        <Route path='/categories' exact={true} element={<Category/>}/>
      </Routes>
    </Router>

  );
}

export default App;
