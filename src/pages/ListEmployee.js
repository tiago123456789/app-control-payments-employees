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
        <br/>
        <ListGroup>
          {employees.map(employee => {
            return <ListGroupItem key={employee.id} onClick={() => props.history.push(`/employees/${employee.id}/workOverTime/new`)}
              className="justify-content-between">
              {employee.name}
              <div style={{  padding: "10px" }}>
                <Link to={`/employees/sell-on-credit/${employee.id}`} className="btn btn-primary" style={{ margin: "15px 0px" }} >
                  Fiado
                 </Link>&nbsp;
                 <Link to={`/employees/vouchers/${employee.id}`} className="btn btn-primary" style={{ margin: "15px 0px" }} >
                  Vale
                 </Link>&nbsp;
                 <Link to={`/employees/workOverTime/${employee.id}`} className="btn btn-primary" style={{ margin: "15px 0px" }} >
                  Horas extras
                 </Link>&nbsp;
                 <Link to={`/employees/service-per-piece/${employee.id}`} className="btn btn-primary" style={{ margin: "15px 0px" }} >
                  Serviços por peças
                 </Link>&nbsp;
              </div>
            </ListGroupItem>
          })}
        </ListGroup>
      </Container>
    </>
  );
}

export default ListEmployee;
