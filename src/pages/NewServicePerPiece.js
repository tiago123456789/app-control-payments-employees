import { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import InputMask from "react-input-mask"
import { useFormik } from 'formik';
import RegisterEmployeeValidation from "../validations/RegisterEmployee"
import EmployeeService from "../services/EmployeeService"
import { ToastContainer, toast } from 'react-toastify';
import AlertErrorInput from "../components/AlertErrorInput"
import Header from '../components/Header';
import ServicePerPieceService from '../services/ServicePerPieceService';
import moment from "moment"
import RegisterServicePerPiece from '../validations/RegisterServicePerPiece';
import { Link } from 'react-router-dom';

const employeeService = new EmployeeService();
const servicePerPieceService = new ServicePerPieceService();

function NewVoucher(props) {
  const [employee, setEmployee] = useState("")

  const formik = useFormik({
    initialValues: {
      description: '',
      valuePerPiece: '',
      quantityPieces: 1
    },
    validationSchema: RegisterServicePerPiece ,
    onSubmit: async (values, { resetForm }) => {
      values.valuePerPiece = values.valuePerPiece.replace(/([^0-9,.])/, "")
      values = {
        ...values, 
        employee: {
          id: props.match.params.employeeId,
          name: employee.name          
        },
        createdAt: moment().format("YYYY-MM-DD")
      }
      await servicePerPieceService.register(values)
      resetForm();
      toast("Cadastrado com sucesso!!!", {
        type: "success", theme: "colored"
      })
    },
  });

  const getId = () => {
    return  props.match.params.employeeId;
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
        <h1>Cadastrar serviços por peça do funcionário <span className="text-uppercase">{employee.name}</span></h1>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Qual foi o serviço feito?</Label>
            <Input type="text"
              id="description" name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
               placeholder="" />
            <AlertErrorInput formik={formik} field="description" />
          </FormGroup>
          <FormGroup>
            <Label for="salary">Valor serviço por peça:</Label>
            <InputMask mask="99.99"
              id="valuePerPiece" name="valuePerPiece"
              onChange={formik.handleChange}
              value={formik.values.valuePerPiece}
              className="form-control" />
            <AlertErrorInput formik={formik} field="valuePerPiece" />
          </FormGroup>

          <FormGroup>
            <Label for="salary">Quantidade de peças:</Label>
            <Input type="number"
              id="quantityPieces" name="quantityPieces"
              onChange={formik.handleChange}
              value={formik.values.quantityPieces}
              className="form-control" />
            <AlertErrorInput formik={formik} field="quantityPieces" />
          </FormGroup>

      
          <br />
          <Button>Cadastrar</Button>&nbsp;
          <Link to={`/employees/service-per-piece/${getId()}`} className="btn btn-primary" style={{ margin: "5px 0px " }}>
            Voltar
          </Link>
        </Form>
      </Container>
    </>
  );
}

export default NewVoucher;
