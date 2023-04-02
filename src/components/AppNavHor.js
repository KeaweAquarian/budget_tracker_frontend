import { Nav, NavItem, NavLink, Navbar } from "reactstrap";
import { Button } from "reactstrap";
import { useLocalState } from "../util/useLocalStorage";

const AppNavHor = () => {
  const [, setJwt] = useLocalState("", "jwt");

  const logOut = () => {
    setJwt("");

    window.location = "/auth";
  };
  return (
    <>
      <Navbar color="dark" dark style={{ borderRadius: "4px" }}>
        <Nav className="ml-auto" navbar pills></Nav>
        <NavItem style={{ fontSize: "12px" }}>
          <NavLink
            href="/"
            style={
              window.location.href === "http://localhost:3000/"
                ? {
                    borderRadius: "8px",
                    color: "white",
                  }
                : { color: "#0249cc" }
            }
          >
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem style={{ fontSize: "12px" }}>
          <NavLink
            href="/expenses"
            style={
              window.location.href === "http://localhost:3000/expenses"
                ? {
                    borderRadius: "8px",
                    color: "white",
                  }
                : { color: "#0249cc" }
            }
          >
            Expences
          </NavLink>
        </NavItem>
        <NavItem style={{ fontSize: "12px" }}>
          <NavLink
            href="/categories"
            style={
              window.location.href === "http://localhost:3000/categories"
                ? {
                    borderRadius: "8px",
                    color: "white",
                  }
                : { color: "#0249cc" }
            }
          >
            Categories
          </NavLink>
        </NavItem>
        <NavItem style={{ fontSize: "12px" }}>
          <NavLink
            href="/about"
            style={
              window.location.href === "http://localhost:3000/about"
                ? {
                    borderRadius: "8px",
                    color: "white",
                  }
                : { color: "#0249cc" }
            }
          >
            About
          </NavLink>
        </NavItem>
        <Button
          size="sm"
          color="secondary"
          outline
          onClick={logOut}
          style={{ fontSize: "10px" }}
        >
          Log Out
        </Button>
      </Navbar>
    </>
  );
};

export default AppNavHor;
