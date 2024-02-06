import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"
import { GiSandwich } from "react-icons/gi";

function Login() {

  const navigate = useNavigate()

  // const { login } = useUser()

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Please enter valid email"),
    password: yup.string().required("Password incorrect").max(25)
  })

  // const [form, setForm] = useState(formSchema)
  // const [loggedIn, setLoggedIn] = useState("")

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
          data.forEach((currentUser) => {
            if (
              currentUser.user_email === formik.values.email &&
              currentUser.password === formik.values.password
            ) {
              navigate(`/sandwiches`, {
                state: { currentUser },
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
      // fetch("/login", {
      //   method: 'GET',
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values)
      // }).then((r) => {
      //   if (r.ok) {
      //     r.json().then((user) => {
      //           if (user.id) {
      //             console.log('you signed in')
      //             // login(user)
      //             setForm(formSchema)
      //             setLoggedIn(user.id)
      //             navSwipe(user.id)
      //             } else {
      //               console.log('Login failed: ', user)
      //             }
      //         })
      //   } else {
      //     r.json().then((err) => console.log('error'))
      //   }
      // })
    }
  })

  // function navSwipe(id) {
  //   navigate('/sandwiches', { state: { loggedIn: id}})
  // }

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
            <GiSandwich />
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
            <GiSandwich />
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
