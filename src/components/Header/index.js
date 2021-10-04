import React from "react";
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import AuthService from "../../services/AuthService"

const authService = new AuthService();

export default (props) => {
  
  const logout = () => {
    authService.logout()
    window.location.href= "/"
  }

  const isOffline = () => {
    return !window.navigator.onLine
  }

  return (
    <div>
      <Navbar color="dark" light style={{ "padding": "15px 0px" }}>
        <NavbarBrand href="/employees" className="mr-auto text-white" style={{ paddingLeft: "10px" }}>Controle de pagamento</NavbarBrand>
        { authService.isAuthenticated() &&
                <Button onClick={() => logout()} style={{ margin: "0px 10px" }}>Sair</Button>
        }
      </Navbar>
      { isOffline() && 
        <div className="alert alert-danger text-center">
          É necessário internet para usar o aplicativo.
        </div>
      }
      
    </div>
  )
  }