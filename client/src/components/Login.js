import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"
import ThemeContext from "./ThemeContext";

function Login() {

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

  return (
    <ThemeContext.Provider value = {loggedIn}>
      <div className="Login">
        <h1>Project Client</h1>
      </div>
    </ThemeContext.Provider>
  )
}

export default Login;
