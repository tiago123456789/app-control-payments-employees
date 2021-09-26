import React from "react";
import { Navbar, NavbarBrand } from 'reactstrap';

export default () => (
    <div>
      <Navbar color="dark" light>
        <NavbarBrand href="/" className="mr-auto text-white" style={{ paddingLeft: "10px" }}>Control Payment</NavbarBrand>
        {/* <NavbarToggler onClick={toggleNavbar} className="mr-2" /> */}
        {/* <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse> */}
      </Navbar>
    </div>
)