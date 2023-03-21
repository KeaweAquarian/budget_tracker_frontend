import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Store from "./components/context/Store";
import Category from "./Category";
import Expenses from "./Expenses";
import Home from "./home";
import Auth from "./components/login/Auth";
import { useEffect, useState } from "react";
import { useLocalState } from "./util/useLocalStorage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AppNav from "./appNav";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [active, setActive] = useState("1");

  const toggleLink = (link) => {
    setActive(link);
    console.log(link);
  };

  return (
    <>
      <div
        className="d-flex"
        style={{ backgroundColor: "#EEF5F7", height: "100vh" }}
      >
        <AppNav toggleLink={toggleLink} active={active} />
        <Store>
          <Router>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                exact={true}
                element={
                  <PrivateRoute>
                    <Expenses />
                  </PrivateRoute>
                }
              />
              <Route path="/categories" exact={true} element={<Category />} />
              <Route path="/about" exact={true} element={<Home />} />
            </Routes>
          </Router>
        </Store>
      </div>
    </>
  );
}

export default App;
