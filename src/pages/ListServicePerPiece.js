import { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import ServicePerPieceService from "../services/ServicePerPieceService"
import EmployeeService from "../services/EmployeeService"
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import moment from "moment"
import { formatCurrency } from "../utils/Format"
import { Link } from 'react-router-dom';

const servicePerPieceService = new ServicePerPieceService();
const employeeService = new EmployeeService();

function ListServicePerPiece(props) {
  const [servicePerPieces, setServicePerPieces] = useState([])
  const [employee, setEmployee] = useState([])
  const [id, setId] = useState(null);
  const [filters, setFilters] = useState({
    dateInitial: `${moment().format("YYYY-MM")}-01`,
    dateFinal: `${moment().format("YYYY-MM")}-30`,
  })

  const getId = () => {
    return props.match.params.employeeId;
  }

  const getServicePerPiecesTheEmployee = async () => {
    const register = await servicePerPieceService.getByEmployeeId(getId(), filters)
    setServicePerPieces(register)
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
      await getServicePerPiecesTheEmployee()
    })()
  }, [filters])

  useEffect(() => {
    (async () => {
      await getServicePerPiecesTheEmployee()
      await getEmployee()
    })()
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <br />
      <Container>
        <h1>Services por peça do funcionário(a) {employee.name} </h1>
        <Link to={`/employees/service-per-piece/${getId()}/new`} className="btn btn-primary" style={{ margin: "5px 0px " }}>
          Cadastrar serviço por peça
        </Link>
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
              <th>Valor por peça</th>
              <th>Quantidade</th>
              <th>Total</th>

            </tr>
          </thead>
          <tbody>
            {servicePerPieces.map(item => {
              return (
                <tr>
                  <th scope="row">{moment(item.createdAt).format("DD/MM/YYYY")}</th>
                  <td>{
                    formatCurrency(item.valuePerPiece)}</td>
                  <td>{item.quantityPieces}</td>
                  <td>{
                    formatCurrency(servicePerPieceService.calculateTotalValuePerService(
                      item.valuePerPiece, item.quantityPieces
                    ))}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default ListServicePerPiece;
