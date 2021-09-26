import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Login from "./pages/Login"
import ListEmployee from "./pages/ListEmployee"
import NewEmployee from "./pages/NewEmployee"
import NewWorkOvertimeEmployee from "./pages/NewWorkOvertimeEmployee"
import ListWorkOvertimeEmployee from "./pages/ListWorkOvertimeEmployee"
import 'react-toastify/dist/ReactToastify.css';
import NewVoucher from './pages/NewVoucher';
import ListVoucherEmployee from './pages/ListVoucherEmployee';


function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/employees" component={ListEmployee} />
          <Route exact path="/employees/:employeeId/workOverTime" 
          component={ListWorkOvertimeEmployee} />
            <Route exact path="/employees/:employeeId/vouchers" 
          component={ListVoucherEmployee} />
          <Route exact path="/employees/:employeeId/workOverTime/new" 
            component={NewWorkOvertimeEmployee} />
          <Route exact path="/employees/:employeeId/vouchers/new" 
            component={NewVoucher} />
          <Route exact path="/employees/new" component={NewEmployee} />

          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
