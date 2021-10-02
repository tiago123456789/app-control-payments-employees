import { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import InputMask from "react-input-mask"
import { useFormik } from 'formik';
import RegisterVoucherEmployee from "../validations/RegisterVoucherEmployee"
import EmployeeService from "../services/EmployeeService"
import { ToastContainer, toast } from 'react-toastify';
import AlertErrorInput from "../components/AlertErrorInput"
import Header from '../components/Header';
import SellOnCreditService from '../services/SellOnCreditService';
import moment from "moment"

const employeeService = new EmployeeService();
const sellOnCreditService = new SellOnCreditService();

function NewSellOnCredit(props) {
  const [employee, setEmployee] = useState("")

  const formik = useFormik({
    initialValues: {
      description: '',
      value: '',
    },
    validationSchema: RegisterVoucherEmployee,
    onSubmit: async (values, { resetForm }) => {
      values.value = values.value.replace(/[_]/g, "")
      values = {
        ...values,
        employee: {
          id: props.match.params.employeeId,
          name: employee.name
        },
        createdAt: moment().format("YYYY-MM-DD")
      }
      await sellOnCreditService.register(values)
      resetForm();
      toast("Cadastrado com sucesso!!!", {
        type: "success", theme: "colored"
      })
    },
  });

  const getEmployee = async () => {
    const id = props.match.params.employeeId;
    const employee = await employeeService.getById(id)
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
        <h1>Cadastrar fiados do funcionário <span className="text-uppercase">{employee.name}</span></h1>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">O que foi pego fiado?</Label>
            <Input type="text"
              id="description" name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="" />
            <AlertErrorInput formik={formik} field="description" />
          </FormGroup>
          <FormGroup>
            <Label for="salary">Valor:</Label>
            <InputMask mask="999.99"
              id="value" name="value"
              onChange={formik.handleChange}
              value={formik.values.value}
              className="form-control" />
            <AlertErrorInput formik={formik} field="value" />
          </FormGroup>
          <br />
          <Button>Cadastrar</Button>
        </Form>
      </Container>
    </>
  );
}

export default NewSellOnCredit;
