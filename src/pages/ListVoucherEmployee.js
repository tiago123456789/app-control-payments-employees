import { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import VoucherService from "../services/VoucherService"
import EmployeeService from "../services/EmployeeService"
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import moment from "moment"
import { formatCurrency } from "../utils/Format"

const voucherService = new VoucherService();
const employeeService = new EmployeeService();

function ListVoucherEmployee(props) {
  const [vouchers, setVouchers] = useState([])
  const [employee, setEmployee] = useState([])
  const [id, setId] = useState(null);
  const [filters, setFilters] = useState({
    dateInitial: `${moment().format("YYYY-MM")}-01`,
    dateFinal: `${moment().format("YYYY-MM")}-30`,
  })

  const getId = () => {
    return props.match.params.employeeId;
  }

  const getVouchersTheEmployee = async () => {
    const register = await voucherService.getByEmployeeId(getId(), filters)
    setVouchers(register)
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
      await getVouchersTheEmployee()
    })()
  }, [filters])

  useEffect(() => {
    (async () => {
      await getVouchersTheEmployee()
      await getEmployee()
    })()
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <br />
      <Container>
        <h1>Vales do funcionário(a) {employee.name} </h1>
        <div style={{ margin: "10px" }}>
            <label>Data inicial: </label>&nbsp;&nbsp;
            <input type="date" value={filters.dateInitial} onChange={(event) => changeFilterDate("dateInitial", event.target.value)} />&nbsp;
            <label>Data final: </label>&nbsp;
            <input type="date" value={filters.dateFinal} onChange={(event) => changeFilterDate("dateFinal", event.target.value)} />
        </div>
        <Table className="table-responsive">
          <thead>
            <tr>
              <th>Data</th>
              <th>Valor</th>
              <th>Vale</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map(item => {
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

export default ListVoucherEmployee;
