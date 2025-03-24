import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { register } from "../store/userSlice";

//a hook suggested from formik for handling errors
//it makes sure the error messages only appear if the user has touched the specific field
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

//a hook for efficient password validation
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str}`;
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  return (
    <div>
      {/*adding the form inside a container and using rows for more attractive styling */}
      <Container fluid className="d-flex vh-100 pb-5">
        <Row className="m-auto">
          <Col className="text-center">
            <Row>
              <h1 className="text-center pb-3" style={{ color: "#283618" }}>
                Register
              </h1>
            </Row>
            <Formik
              //initializing the values withing this form
              initialValues={{
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              //using yup as suggested from formik to handle the validation and errors
              validationSchema={Yup.object({
                firstName: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                lastName: Yup.string()
                  .max(20, "Must be 20 characters or less")
                  .required("Required"),
                username: Yup.string()
                  .min(3, "Must be at least 3 characters")
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string()
                  //creating all the requirements for the password using the hook from earlier
                  .min(8, "Must contain 8 characters or more")
                  .required("Required")
                  .matches(
                    /[a-z]/,
                    getCharacterValidationError("lowercase letter")
                  )
                  .matches(
                    /[A-Z]/,
                    getCharacterValidationError("uppercase letter")
                  )
                  .matches(/[0-9]/, getCharacterValidationError("digit"))
                  .matches(
                    /[!@#$%^&*(),.?":{}|<>]/,
                    getCharacterValidationError("special character")
                  ),
                //making sure the passwords match
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Confirm Password is required"),
              })}
              onSubmit={(values, { resetForm }) => {
                dispatch(register(values.username));
                alert(`Registered with username: ${values.username}`); //MAKE A MODAL!!!!!!!!!
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/*creating the inputs using the template formik suggests */}
                  <Row>
                    <MyTextInput
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="Jane"
                      className="mb-1"
                    />
                  </Row>

                  <Row>
                    <MyTextInput
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      className="mb-1"
                    />
                  </Row>
                  <Row>
                    <MyTextInput
                      label="Username"
                      name="username"
                      type="text"
                      placeholder="Enter your username here..."
                      className="mb-1"
                    />
                  </Row>
                  <Row>
                    <MyTextInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="jane@formik.com"
                      className="mb-1"
                    />
                  </Row>
                  <Row>
                    <MyTextInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Type password here..."
                      className="mb-1"
                    />
                  </Row>
                  <Row>
                    <MyTextInput
                      label="Confirm password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      className="mb-1"
                    />
                  </Row>
                  <Row>
                    <Button
                      variant="warning"
                      type="submit"
                      className="mt-3 mb-4"
                      style={{ backgroundColor: "#BC6C25" }}
                    >
                      Register
                    </Button>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterForm;
