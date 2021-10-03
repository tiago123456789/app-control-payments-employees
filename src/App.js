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
import NewServicePerPiece from "./pages/NewServicePerPiece"
import ListServicePerPiece from "./pages/ListServicePerPiece"
import NewSellOnCredit from "./pages/NewSellOnCredit"
import ListSellOnCredit from "./pages/ListSellOnCredit"
import ListClosureMonthPayment from "./pages/ListClosureMonthPayment"
import PrivateRoute from "./components/Auth/PrivateRoute"

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />


          <PrivateRoute exact path="/employees" component={ListEmployee} />

          <PrivateRoute exact path="/employees/workOverTime/:employeeId"
            component={ListWorkOvertimeEmployee} />

          <PrivateRoute exact path="/employees/vouchers/:employeeId"
            component={ListVoucherEmployee} />

          <PrivateRoute exact path="/employees/workOverTime/:employeeId/new"
            component={NewWorkOvertimeEmployee} />

          <PrivateRoute exact path="/employees/vouchers/:employeeId/new"
            component={NewVoucher} />

          <PrivateRoute exact path="/employees/service-per-piece/:employeeId/new"
            component={NewServicePerPiece} />

          <PrivateRoute exact path="/employees/service-per-piece/:employeeId"
            component={ListServicePerPiece} />

          <PrivateRoute exact path="/employees/sell-on-credit/:employeeId/new"
            component={NewSellOnCredit} />

          <PrivateRoute exact path="/employees/sell-on-credit/:employeeId"
            component={ListSellOnCredit} />

          <PrivateRoute exact path="/employees/closure-month-payment/:employeeId" 
          component={ListClosureMonthPayment} />

          <PrivateRoute exact path="/employees/new" component={NewEmployee} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
