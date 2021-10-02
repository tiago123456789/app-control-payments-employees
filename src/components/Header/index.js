import React from "react";
import { Navbar, NavbarBrand } from 'reactstrap';

export default () => (
    <div>
      <Navbar color="dark" light>
        <NavbarBrand href="/employees" className="mr-auto text-white" style={{ paddingLeft: "10px" }}>Controle de pagamento</NavbarBrand>
      </Navbar>
    </div>
)