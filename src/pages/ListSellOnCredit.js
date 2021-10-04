import { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import SellOnCreditService from "../services/SellOnCreditService"
import EmployeeService from "../services/EmployeeService"
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import moment from "moment"
import { formatCurrency } from "../utils/Format"
import { Link } from 'react-router-dom';

const sellOnCreditService = new SellOnCreditService();
const employeeService = new EmployeeService();

function ListSellOnCredit(props) {
  const [sellOnCredits, setsellOnCredits] = useState([])
  const [employee, setEmployee] = useState([])
  const [id, setId] = useState(null);
  const [filters, setFilters] = useState({
    dateInitial: `${moment().format("YYYY-MM")}-01`,
    dateFinal: `${moment().format("YYYY-MM")}-30`,
  })

  const getId = () => {
    return props.match.params.employeeId;
  }

  const getSellOnCreditTheEmployee = async () => {
    const register = await sellOnCreditService.getByEmployeeId(getId(), filters)
    setsellOnCredits(register)
  }

  const getEmployee = async () => {
    const register = await employeeService.getById(getId());
    setEmployee(register)
  }

  const changeFilterDate = async (key, value) => {
    setFilters({...filters, [key]: value });
  }

  useEffect(() => {
    (async () => {
      await getSellOnCreditTheEmployee()
    })()
  }, [filters])

  useEffect(() => {
    (async () => {
      await getSellOnCreditTheEmployee()
      await getEmployee()
    })()
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <br />
      <Container>
        <h1>Lista de fiados do funcionário(a) {employee.name} </h1>
        <Link to={`/employees/sell-on-credit/${getId()}/new`} className="btn btn-primary" style={{ margin: "5px 0px " }}>
          Cadastrar fiado
        </Link>
        <br/>
        <div style={{ margin: "10px" }}>
            <label>Data inicial: </label>&nbsp;&nbsp;
            <input type="date" value={filters.dateInitial} onChange={(event) => changeFilterDate("dateInitial", event.target.value)} />&nbsp;
            <br/>
            <br/>

            <label>Data final: </label>&nbsp;
            <input type="date" value={filters.dateFinal} onChange={(event) => changeFilterDate("dateFinal", event.target.value)} />
        </div>
        <Table className="table-responsive">
          <thead>
            <tr>
              <th>Data</th>
              <th>Valor</th>
              <th>O que pegou?</th>
            </tr>
          </thead>
          <tbody>
            {sellOnCredits.map(item => {
              return (
                <tr>
                  <th scope="row">{moment(item.createdAt).format("DD/MM/YYYY")}</th>
                  <td>{
                    formatCurrency(item.value)}</td>
                  <td>{item.description}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default ListSellOnCredit;
