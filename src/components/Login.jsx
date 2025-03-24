import React from "react";
import { useState } from "react";
import { Formik, Form, useField, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  Container,
  Button,
  Modal,
  ModalHeader,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../store/userSlice";

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

const LogInForm = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);
  const [error, setError] = useState(null);

  return (
    <div>
      {/*adding the form inside a container and using rows for more attractive styling */}

      <Container fluid className="d-flex vh-100 pb-5">
        <Row className="m-auto">
          <Col className="text-center">
            <Row>
              <h1 className="pb-5" style={{ color: "#283618" }}>
                Log In
              </h1>
            </Row>
            <Formik
              //initializing the values withing this form
              initialValues={{
                username: "",
              }}
              //using yup as suggested from formik to handle the validation and errors
              validationSchema={Yup.object({
                username: Yup.string().required("Required"),
              })}
              onSubmit={(values, { resetForm }) => {
                if (values.username === username) {
                  dispatch(logIn(values.username));
                  setError(null);
                } else {
                  setError("Invalid username. Please register.");
                }
                resetForm();
              }}
            >
              <Form>
                {/*creating the inputs using the template formik suggests */}
                <Row>
                  <MyTextInput
                    name="username"
                    type="username"
                    placeholder="Enter your username here"
                  />
                </Row>
                <ErrorMessage name="username" component="div" />
                <Row>
                  <Button
                    style={{ backgroundColor: "#BC6C25" }}
                    type="submit"
                    className="mt-3 mb-5"
                  >
                    Log In
                  </Button>
                </Row>
              </Form>
            </Formik>

            {error && (
              <Modal show={true} onHide={() => setError(null)}>
                <ModalHeader closeButton>Error</ModalHeader>
                <Modal.Body>
                  <p>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setError(null)}>
                    Dismiss
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogInForm;
