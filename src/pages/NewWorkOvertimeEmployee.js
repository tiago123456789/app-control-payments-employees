import { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import InputMask from "react-input-mask"
import { useFormik } from 'formik';
import RegisterWorkOvertimeEmployee from "../validations/RegisterWorkOvertimeEmployee"
import WorkOvertimeService from "../services/WorkOvertimeService"
import EmployeeService from "../services/EmployeeService"
import { ToastContainer, toast } from 'react-toastify';
import AlertErrorInput from "../components/AlertErrorInput"
import Header from '../components/Header';
import moment from "moment";
import { Link } from 'react-router-dom';

const workOvertimeService = new WorkOvertimeService();
const employeeService = new EmployeeService();

function NewWorkOvertimeEmployee(props) {
  const [employee, setEmployee] = useState("")
  const [id, setId] = useState(null);

  const formik = useFormik({
    initialValues: {
      time: '',
    },
    validationSchema: RegisterWorkOvertimeEmployee,
    onSubmit: async (values, { resetForm }) => {
      await workOvertimeService.register({
        employeeId: id,
        createdAt: moment().format("YYYY-MM-DD"),
        valuePerHour: employee.valuePerHour,
        time: values.time
      });
      resetForm();
      toast("Cadastrado com sucesso!!!", {
        type: "success", theme: "colored"
      })
    },
  });
  
  const getId = () => {
    return props.match.params.employeeId;
  }

  const getEmployee = async () => {
    setId(getId());
    const employee = await employeeService.getById(getId())
    setEmployee(employee)
  }

  useEffect(() => {
    (async () => {
      await getEmployee()
    })()
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <br />
      <Container>
        <h1>Cadastro hora extra do funcionário {employee.name} </h1>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Tempo trabalhado:</Label>
            <InputMask mask="99:99" className="form-control"
              id="time" name="time"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="" />
            <AlertErrorInput formik={formik} field="time" />
          </FormGroup>
          <br />
          <Button>Cadastrar</Button>&nbsp;
          <Link to={`/employees/workOverTime/${getId()}`} className="btn btn-primary" style={{ margin: "5px 0px " }}>
            Voltar
        </Link>
          <br />
        </Form>
      </Container>
    </>
  );
}

export default NewWorkOvertimeEmployee;
