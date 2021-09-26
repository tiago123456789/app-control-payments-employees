import { Form, FormGroup, Input, Label, Button, Container } from 'reactstrap';
import Header from '../components/Header';

function Login() {

  return (
    <>
      <Header />
      <br />
      <Container>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Senha</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="" />
          </FormGroup>
          <br />
          <Button>Logar</Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
