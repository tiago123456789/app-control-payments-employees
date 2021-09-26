import { useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import Header from '../components/Header';
import EmployeeService from "../services/EmployeeService"

const employeeService = new EmployeeService();

function ListEmployee(props) {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    const registers = await employeeService.getAll();
    console.log(registers)
    setEmployees(registers);
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
        <ListGroup>
          { employees.map(employee => {
            return <ListGroupItem onClick={() => props.history.push(`/employees/${employee.id}/workOverTime/new`) }
             className="justify-content-between">{employee.name}</ListGroupItem>
          })}
        </ListGroup>
      </Container>
    </>
  );
}

export default ListEmployee;
