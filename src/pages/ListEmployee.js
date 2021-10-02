import { useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link } from "react-router-dom"
import Header from '../components/Header';
import EmployeeService from "../services/EmployeeService"

const employeeService = new EmployeeService();

function ListEmployee(props) {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    const registers = await employeeService.getAll();
    setEmployees(registers);
  }

  const to = (route) => {
    props.history.push(route)
  }

  useEffect(() => {
    (async () => {
      await getEmployees()
    })()
  }, [])

  return (
    <>
      <Header />
      <br />
      <Container>
        <h1>Funcionarios</h1>
        <Link to="/employees/new" className="btn btn-primary" style={{ margin: "5px 0px " }}>
          Novo Funcionário
        </Link>
        <br />
        <ListGroup>
          {employees.map(employee => {
            return (
              <>
                <h3 className="text-capitalize">{employee.name}</h3>
                <Link to={`/employees/sell-on-credit/${employee.id}`} className="btn btn-primary"  >
                  Fiado
                 </Link>&nbsp;
                 <Link to={`/employees/vouchers/${employee.id}`} className="btn btn-primary"  >
                  Vale
                 </Link>&nbsp;
                 <Link to={`/employees/workOverTime/${employee.id}`} className="btn btn-primary"  >
                  Horas extras
                 </Link>&nbsp;
                 <Link to={`/employees/service-per-piece/${employee.id}`} className="btn btn-primary"  >
                  Serviços por peças
                 </Link>&nbsp;
                 <Link to={`/employees/closure-month-payment/${employee.id}`} className="btn btn-primary"  >
                  Fechamento do mês
                 </Link>
                  <div style={{ "border": "1px solid black", margin: "10px 0px"}}></div>
            </>)
          })}
        </ListGroup>
      </Container>
    </>
  );
}

export default ListEmployee;
