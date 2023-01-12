import React,{useState} from 'react'
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import instance from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";
import messages from '../Messages/Messages.json'

const validationSchema = Yup.object().shape({
  email: Yup.string().email("E-mail invalid").required("E-mail is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      "password must be of 8 characters, one uppercase one lowercase and one special character"
    ),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate() 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = (data) => {
    setLoading(true)
    console.log(data)
    instance.post('/api/users/login/',data).then(
      success=>{
        console.log(success)
        setLoading(false)
        navigate(`/home?${messages.messages.successLogin}`)
      }
    ).catch(err=>{
      console.log(err)
      setLoading(false)
      setError(true)
    })
  };

  return (
    <Container style={{ marginTop: "10%" }}>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }}>

          
          <b>
            <h1 className="mb-5 text-center">Login</h1>
          </b>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="email"
                placeholder="Enter email..."
                {...register("email")}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
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
            <div className="d-grid my-5">
              <Button variant="dark" size="lg" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
