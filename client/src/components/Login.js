import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"
import { GiSandwich } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./userActions";

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
        <h1 className = "login-title">Unhinged</h1>
        <div className="Login">
          <form onSubmit = {formik.handleSubmit}>
            <input 
              type = "email"
              name = "email"
              onChange={formik.handleChange}
              value = {formik.values.email}
              placeholder = "Email"
              onBlur = {formik.handleBlur}>
            </input>
            <GiSandwich style={{ fontSize: '40px' }}/>
            <p>
              {formik.touched.email && formik.errors.email ? (
                <h3>{formik.errors.email}</h3>
              ) : ('')}
            </p>
            <input 
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              onBlur={formik.handleBlur}>
            </input>
            <GiSandwich style={{ fontSize: '40px' }}/>
            <p>
              {formik.touched.password && formik.errors.password ? (
                  <h3>{formik.errors.password}</h3>
              ) : ('')}
            </p>
            <button className="login_button" type="submit" onClick={formik.handleSubmit}>Log In</button>
            <button className="signup-link">
              <Link className="link-to-signup" to={`/signup`}>Sign Up Here</Link>
            </button>
          </form>
        </div>
      </div>
  )
}

export default Login;
