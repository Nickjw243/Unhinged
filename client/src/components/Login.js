import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"
import { GiSandwich } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./userActions";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/esm/Button";

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Please enter valid email"),
    password: yup.string().required("Password incorrect").max(25)
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/users")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          const user = data.find((currentUser) => 
              currentUser.user_email === formik.values.email &&
              currentUser.password === formik.values.password
            ) 
            if (user) {
              dispatch(loginSuccess(user))
              navigate(`/sandwiches`, {state: { currentUser: user }});
            }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    })

  return (
    <div>
            
        <h1 className = "login-title"><GiSandwich style={{ fontSize: '50px' }}/> Unhinged <GiSandwich style={{ fontSize: '50px' }}/></h1>
        <div className="Login">
          <form onSubmit = {formik.handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
              >
              <Form.Control 
                type = "email"
                name = "email"
                onChange={formik.handleChange}
                value = {formik.values.email}
                placeholder = "Email"
                onBlur = {formik.handleBlur}
                />
              </FloatingLabel>
            <p>
              {formik.touched.email && formik.errors.email ? (
                <h3>{formik.errors.email}</h3>
              ) : ('')}
            </p>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              >
              <Form.Control 
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder= "Password"
                onBlur={formik.handleBlur}
              />
            </FloatingLabel>
            <p>
              {formik.touched.password && formik.errors.password ? (
                  <h3>{formik.errors.password}</h3>
              ) : ('')}
            </p>
            <Button className="login_button" type="submit" onClick={formik.handleSubmit}>Log In</Button>
            <Button className="signup-link" href={`/signup`}>Sign Up Here</Button>
          </form>
        </div>
      </div>
  )
}

export default Login;
