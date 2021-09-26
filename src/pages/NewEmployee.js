import { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import InputMask from "react-input-mask"
import { useFormik } from 'formik';
import RegisterEmployeeValidation from "../validations/RegisterEmployee"
import EmployeeService from "../services/EmployeeService"
import { ToastContainer, toast } from 'react-toastify';
import AlertErrorInput from "../components/AlertErrorInput"
import Header from '../components/Header';

const employeeService = new EmployeeService();

function NewEmployee() {
  const formik = useFormik({
    initialValues: {
      name: '',
      cellphone: '',
      salary: '',
      valuePerHour: ''
    },
    validationSchema: RegisterEmployeeValidation,
    onSubmit: async (values, { resetForm }) => {
      await employeeService.register(values);
      resetForm();
      toast("Cadastrado com sucesso!!!", {
        type: "success", theme: "colored"
      })
    },
  });

  return (
    <>
     <Header />
      <ToastContainer />
      <br />
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Nome</Label>
            <Input type="text"
              id="name" name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name" id="exampleEmail" placeholder="" />
            <AlertErrorInput formik={formik} field="name" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Número do zap</Label>
            <InputMask mask="(99) 99999-9999"
              id="cellphone" name="cellphone"
              onChange={formik.handleChange}
              value={formik.values.cellphone}
              className="form-control" />
            <AlertErrorInput formik={formik} field="cellphone" />

          </FormGroup>
          <FormGroup>
            <Label for="salary">Salário</Label>
            <InputMask mask="9.999.99"
              id="salary" name="salary"
              onChange={formik.handleChange}
              value={formik.values.salary}
              className="form-control" />
            <AlertErrorInput formik={formik} field="salary" />


          </FormGroup>
          <FormGroup>
            <Label for="valueOvertime">Valor da hora extra</Label>
            <InputMask mask="99.99"
              id="valuePerHour" name="valuePerHour"

              onChange={formik.handleChange}
              value={formik.values.valuePerHour}
              className="form-control" />
            <AlertErrorInput formik={formik} field="valuePerHour" />


          </FormGroup>
          <br />
          <Button>Cadastrar</Button>
        </Form>
      </Container>
    </>
  );
}

export default NewEmployee;
