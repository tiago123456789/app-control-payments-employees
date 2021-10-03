import React from "react";
import AuthService from "../../../services/AuthService";
import { Redirect, Route } from "react-router-dom";
import firebase from "firebase";

const authService = new AuthService();

export default ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (       
            authService.isAuthenticated()
            ? <Component {...props} />
            : <Redirect to='/login' />
         )} />
    )
} 