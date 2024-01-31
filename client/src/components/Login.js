import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"

function Login() {

  const navigate = useNavigate()

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Please enter valid email"),
    password: yup.string().required("Password incorrect").max(25)
  })

  const [form, setForm] = useState(formSchema)
  const [loggedIn, setLoggedIn] = useState(formSchema.email)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      }).then((r) => {
        if (r.ok) {
          r.json().then(user => {
                if (user.id) {
                  console.log('you signed in')
                  setForm(formSchema)
                  setLoggedIn(user.id)
                  navSwipe(user.id)
                  } else {
                    console.log('Login failed: ', user)
                  }
              })
        } else {
          r.json().then((err) => console.log('error'))
        }
      })
    }
  })

  function navSwipe(id) {
    navigate('/sandwiches', { state: { loggedIn: id}})
  }

  return (
      <div className="Login">
        <h1 classname = "login-title">Unhinged</h1>
        <form onSubmit = {formik.handleSubmit}>
          <input 
            type = "text"
            name = "email"
            onChange={formik.handleChange}
            value = {formik.values.email}
            placeholder = "Email"
            onBlur = {formik.handleBlur}>
          </input>
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
          <p>
            {formik.touched.password && formik.errors.password ? (
                <h3>{formik.errors.password}</h3>
            ) : ('')}
          </p>
          <button class="btn btn-danger" className="login_button" type="submit">
            <Link className="link-to-sandwich-main" to={'/sandwiches'}>Log In</Link>
          </button>
        </form>
        <button class="btn btn-outline-danger">
          <Link className="link-to-signup" to={`/signup`}>Sign Up Here</Link>
        </button>
      </div>
  )
}

export default Login;
