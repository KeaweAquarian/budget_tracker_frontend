
import {Nav,Navbar,NavItem,NavbarBrand, NavLink} from 'reactstrap';

import React from 'react'

const appNav = () => {
        return (
          <div>
            <Navbar color="dark" dark  expand="md">
              <NavbarBrand href="/">Project Expense Tracker</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    <NavLink href="/Auth">Auth</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/">Expences</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/categories">Categories</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/about">About</NavLink>
                  </NavItem>
                
                </Nav>
          
            </Navbar>
          </div>
        );
}

export default appNav




      
