import { Nav, NavItem, NavbarBrand, NavLink, Navbar } from "reactstrap";
import logo from "../images/logo2.png";

const AppNavHor = () => {
  return (
    <>
      <Navbar
        className="my-2"
        color="dark"
        dark
        style={{ borderRadius: "4px" }}
      >
        <Nav className="ml-auto" navbar pills></Nav>
        <NavItem>
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
        <NavItem>
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
        <NavItem>
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
        <NavItem>
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
      </Navbar>
    </>
  );
};

export default AppNavHor;
