import { Form, FormGroup, Input, Label, Button, Container } from 'reactstrap';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import AuthService from '../services/AuthService';

const authService = new AuthService()

function Login(props) {
  const [credential, setCredential] = useState({ email: "", password: ""});

  const handlerInputValue = (key, value) => {
    setCredential({...credential, [key]: value });
  }

  const submit = async (event) => {
    event.preventDefault()
    try {
      const user = await authService.signIn(credential.email, credential.password)
      localStorage.setItem("id", user.user.uid);
      toast("Login feito com sucesso. Você será redirecionado agora!", {
        type: "success", theme: "colored"
      })
      props.history.push("/employees");
     
    } catch(error) {
      toast("Email ou senha inválidas!", {
        type: "warning", theme: "colored"
      })
    }

    
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <br />
      <Container>
        <Form onSubmit={submit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" 
            value={credential.value}
            onChange={(event) => handlerInputValue("email", event.target.value)}
            name="email" id="exampleEmail" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Senha</Label>
            <Input type="password" name="password"
            value={credential.password}
            onChange={(event) => handlerInputValue("password", event.target.value)}
            id="examplePassword" placeholder="" />
          </FormGroup>
          <br />
          <Button>Logar</Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
