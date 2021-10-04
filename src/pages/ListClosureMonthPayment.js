import { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import EmployeeService from "../services/EmployeeService"
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import moment from "moment"
import { formatCurrency } from "../utils/Format"
import SellOnCreditService from "../services/SellOnCreditService"
import ServicePerPieceService from "../services/ServicePerPieceService"
import VoucherService from "../services/VoucherService"
import WorkOvertimeService from "../services/WorkOvertimeService"
import ClosureMonthPaymentService from "../services/ClosureMonthPaymentService"

const sellOnCreditService = new SellOnCreditService();
const servicePerPieceService = new ServicePerPieceService();
const voucherService = new VoucherService();
const workOvertimeService = new WorkOvertimeService();
const employeeService = new EmployeeService();
const closureMonthPaymentService = new ClosureMonthPaymentService();

function ListClosureMonthPayment(props) {
  const [sellOnCredits, setsellOnCredits] = useState([])
  const [servicePerPieces, setServicePerPieces] = useState([])
  const [vouchers, setVouchers] = useState([])
  const [workOvertimes, setWorkOvertimeService] = useState([])


  const [employee, setEmployee] = useState([])
  const [id, setId] = useState(null);
  const [filters, setFilters] = useState({
    dateInitial: `${moment().format("YYYY-MM")}-01`,
    dateFinal: `${moment().format("YYYY-MM")}-30`,
  })

  const getId = () => {
    return props.match.params.employeeId;
  }

  const loadDatas = async () => {
    const register = await sellOnCreditService.getByEmployeeId(getId(), filters)
    setsellOnCredits(register)
    const registersVouchers = await voucherService.getByEmployeeId(getId(), filters);
    setVouchers(registersVouchers)
    const registersServicePerPieces = await servicePerPieceService.getByEmployeeId(getId(), filters)
    setServicePerPieces(registersServicePerPieces)
    const registersWorkOvertimeService = await workOvertimeService.getByEmployeeId(getId(), filters);
    setWorkOvertimeService(registersWorkOvertimeService);
  }

  const getEmployee = async () => {
    const register = await employeeService.getById(getId());
    setEmployee(register)
  }

  const changeFilterDate = async (key, value) => {
    setFilters({ ...filters, [key]: value });
  }

  const sendSummaryWhatsapp = () => {
    const phone = employee.cellphone.replace(/[^0-9]/g, "")
    let message = "";
    message += "*Vales:* %0a";
    message += vouchers.map(item => {
      return `Valor: ${formatCurrency(item.value)} | Data: ${moment(item.createdAt).format("DD/MM/YYYY")} | Motivo: ${item.description}`
    }).join("%0a")
    message += "%0a"
    message += "%0a"
    message += "*Fiados*: %0a";
    message += sellOnCredits.map(item => {
      return `Valor: ${formatCurrency(item.value)} | Data: ${moment(item.createdAt).format("DD/MM/YYYY")} | O que pegou: ${item.description}`
    }).join("%0a")
    message += "%0a"
    message += "%0a"
    message += "*Horas extras* %0a";
    message += workOvertimes.map(item => {
      return `Valor por hora: ${formatCurrency(item.valuePerHour)} | Data: ${moment(item.createdAt).format("DD/MM/YYYY")} | tempo: ${item.time} | Valor total: ${formatCurrency(
        workOvertimeService.calculeValueMoney(item.time, item.valuePerHour)
      )}`;
    }).join("%0a")
    message += "%0a"
    message += "%0a"
    message += "*Serviços por peça* %0a";
    message += servicePerPieces.map(item => {
      return `Valor por peça: ${formatCurrency(item.valuePerPiece)} | Data: ${moment(item.createdAt).format("DD/MM/YYYY")} | Quantidade de peças: ${item.quantityPieces} | Valor total: ${formatCurrency(servicePerPieceService.calculateTotalValuePerService(
        item.valuePerPiece, item.quantityPieces
      ))}`;
    }).join("%0a")
    message += "%0a"
    message += "%0a"
    message += "*Resumo do mês:* %0a"
    message += "*Total fiados:* "
    message += formatCurrency(
        closureMonthPaymentService.calculeTotalSellOnCredit(sellOnCredits)
    )
    message += "%0a"
    message += "*Total serviço por peça:* "
    message += formatCurrency(
      closureMonthPaymentService.calculeTotalServicePerPieces(servicePerPieces)
    )
    message += "%0a"
    message += "*Total vales:* "
    message += formatCurrency(
      closureMonthPaymentService.calculeTotalVouches(vouchers)
    )
    message += "%0a"
    message += "*Total horas extras:* "
    message += formatCurrency(
      closureMonthPaymentService.calculeTotalWorkOverTimes(workOvertimes)
    )
    message += "%0a"
    message += "*Valor que sobrou para você:* "
    message += formatCurrency(
      closureMonthPaymentService.calculeValueRestToEmployee(
        vouchers, sellOnCredits, servicePerPieces, workOvertimes, employee.salary
      )
    )
    const a = document.createElement("a");
    a.href = `https://api.whatsapp.com/send?phone=55${phone}&text=${message}`;
    a.target = "_blank";
    a.click()
  }

  useEffect(() => {
    (async () => {
      await loadDatas()
    })()
  }, [filters])

  useEffect(() => {
    (async () => {
      await loadDatas()
      await getEmployee()
    })()
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <br />
      <Container>
        <h1>Fechamento do funcionário(a) {employee.name} </h1>

        <ul style={{ listStyle: "none", padding: "15px", border: "1px solid rgba(0, 0, 0, .5)" }}>
          <li>Total fiados: {
            formatCurrency(
              closureMonthPaymentService.calculeTotalSellOnCredit(sellOnCredits)
            )
          }
          </li>
          <li>Total serviço por peça: {
            formatCurrency(
              closureMonthPaymentService.calculeTotalServicePerPieces(servicePerPieces)
            )
          }</li>
          <li>Total vales: {
            formatCurrency(
              closureMonthPaymentService.calculeTotalVouches(vouchers)
            )
          }</li>
          <li>Total horas extras: {
            formatCurrency(
              closureMonthPaymentService.calculeTotalWorkOverTimes(workOvertimes)
            )
          }</li>
        </ul>
        <br />
        <a className="btn btn-success" onClick={() => sendSummaryWhatsapp()}>Enviar resumo pelo zap</a>
        <br />
        <div style={{ margin: "10px" }}>
          <label>Data inicial: </label>&nbsp;&nbsp;
            <input type="date" value={filters.dateInitial} onChange={(event) => changeFilterDate("dateInitial", event.target.value)} />&nbsp;
            <br/>
            <br/>

            <label>Data final: </label>&nbsp;
            <input type="date" value={filters.dateFinal} onChange={(event) => changeFilterDate("dateFinal", event.target.value)} />
        </div>
        <br />
        <h1>Fiados</h1>
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
        <br />
        <h1>Services por peça</h1>
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
        <br />
        <h1>Vales</h1>
        <br />
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
        <br />
        <h1>Horas extras</h1>
        <br />
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
            {workOvertimes.map(item => {
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

export default ListClosureMonthPayment;
