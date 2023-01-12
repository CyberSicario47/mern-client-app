import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import instance from "../../utils/axios/axios"

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Username is required"),
  email: Yup.string()
    .email(" E-mail is invalid")
    .required("E-mail is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      "password must be of 8 characters, one uppercase one lowercase and one special character"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Not same as the password"),
});

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const config = {
    headers: { 'Content-Type': 'application/json'},
  }
  const onSubmit = (data) => {
    console.log(data)
    instance.post('/api/users/register/',data,config).then(
      success=>{
        console.log(success)
        alert('success full')
      }
    ).catch(err=>{
      console.log(err)
      alert('failed')
    })
  };

  return (
    <Container style={{ marginTop: "5%" }}>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }}>
          <b>
            <h1 className="mb-5 text-center">Register</h1>
          </b>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name..."
                {...register("name")}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email..."
                {...register("email")}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your password..."
                {...register("password")}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupPasswordConfirmation"
            >
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Confirm your password..."
                {...register("passwordConfirmation")}
                isInvalid={!!errors.passwordConfirmation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirmation?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid my-5">
              <Button variant="dark" size="lg" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterForm;
