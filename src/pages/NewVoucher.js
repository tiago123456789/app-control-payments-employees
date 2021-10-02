import { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import InputMask from "react-input-mask"
import { useFormik } from 'formik';
import RegisterEmployeeValidation from "../validations/RegisterEmployee"
import EmployeeService from "../services/EmployeeService"
import { ToastContainer, toast } from 'react-toastify';
import AlertErrorInput from "../components/AlertErrorInput"
import Header from '../components/Header';
import RegisterVoucherEmployee from '../validations/RegisterVoucherEmployee';
import VoucherService from '../services/VoucherService';
import { mockComponent } from 'react-dom/cjs/react-dom-test-utils.production.min';
import moment from "moment"
import { Link } from 'react-router-dom';

const employeeService = new EmployeeService();
const voucherService = new VoucherService()

function NewVoucher(props) {
  const [employee, setEmployee] = useState("")

  const formik = useFormik({
    initialValues: {
      description: '',
      value: '',
    },
    validationSchema: RegisterVoucherEmployee ,
    onSubmit: async (values, { resetForm }) => {
      values.value = values.value.replace(/([^0-9,.])/, "")
      await voucherService.register({
        ...values,
        employeeId: props.match.params.employeeId,
        createdAt: moment().format("YYYY-MM-DD")
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
        <h1>Cadastrar o vale do funcionário <span className="text-uppercase">{employee.name}</span></h1>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">O vale foi para o que?</Label>
            <Input type="text"
              id="description" name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
               placeholder="" />
            <AlertErrorInput formik={formik} field="description" />
          </FormGroup>
          <FormGroup>
            <Label for="salary">Valor</Label>
            <InputMask mask="999.99"
              id="value" name="value"
              onChange={formik.handleChange}
              value={formik.values.value}
              className="form-control" />
            <AlertErrorInput formik={formik} field="value" />
          </FormGroup>
          <br />
          <Button>Cadastrar</Button>&nbsp;
          <Link to={`/employees/vouchers/${getId()}`} className="btn btn-primary" style={{ margin: "5px 0px " }}>
            Voltar
          </Link>
        </Form>
      </Container>
    </>
  );
}

export default NewVoucher;
