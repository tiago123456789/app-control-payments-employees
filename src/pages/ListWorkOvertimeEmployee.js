import { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import WorkOvertimeService from "../services/WorkOvertimeService"
import EmployeeService from "../services/EmployeeService"
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import moment from "moment"
import { formatCurrency } from "../utils/Format"

const workOvertimeService = new WorkOvertimeService();
const employeeService = new EmployeeService();

function ListWorkOvertimeEmployee(props) {
  const [workOverTimes, setWorkOverTimes] = useState([])
  const [employee, setEmployee] = useState([])
  const [id, setId] = useState(null);
  const [filters, setFilters] = useState({
    dateInitial: `${moment().format("YYYY-MM")}-01`,
    dateFinal: `${moment().format("YYYY-MM")}-30`,
  })

  const getId = () => {
    return props.match.params.employeeId;
  }

  const getWorkOvertimeTheEmployee = async () => {
    const register = await workOvertimeService.getByEmployeeId(getId(), filters)
    console.log(register);
    setWorkOverTimes(register)
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
      await getWorkOvertimeTheEmployee()
    })()
  }, [filters])

  useEffect(() => {
    (async () => {
      await getWorkOvertimeTheEmployee()
      await getEmployee()
    })()
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <br />
      <Container>
        <h1>Horas extras do funcionário(a) {employee.name} </h1>
        <div style={{ margin: "10px" }}>
            <label>Data inicial: </label>&nbsp;&nbsp;
            <input type="date" value={filters.dateInitial} onChange={(event) => changeFilterDate("dateInitial", event.target.value)} />&nbsp;
            <label>Data final: </label>&nbsp;
            <input type="date" value={filters.dateFinal} onChange={(event) => changeFilterDate("dateFinal", event.target.value)} />
        </div>
        <Table className="table-responsive">
          <thead>
            <tr>
              <th>Data </th>
              <th>Valor hora</th>
              <th>Tempo trabalhado</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {workOverTimes.map(item => {
              return (
                <tr>
                  <th scope="row">{moment(item.createdAt).format("DD/MM/YYYY")}</th>
                  <td>{
                    formatCurrency(
                      item.valuePerHour
                    )}</td>
                  <td>{item.time}</td>
                  <td>{
                    formatCurrency(
                      workOvertimeService.calculeValueMoney(item.time, item.valuePerHour)
                    )
                  }</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default ListWorkOvertimeEmployee;
