import { useFormik } from "formik";
import React from "react";
import * as yup from "yup"
import { Link } from "react-router-dom"
import { GiSandwich } from "react-icons/gi";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/esm/Button";


function SignUp() {

    const formSchema = yup.object().shape({
        user_email: yup.string().email("Invalid email").required("Must enter email"),
        username: yup.string().required("Must enter a name").max(25),
        password: yup
            .string()
            .required("Must enter password")
            .max(25)
    });

    const formik = useFormik({
        initialValues: {
        username: "",
        user_email: "",
        password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
        fetch('/users', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((res) => {
            if (res.ok) {
            res.json().then((user) => {
                console.log('ok')
            })
            } else {
                res.json().then((err) => console.log('error'))
            }
        });
        },
    });

    return (
        <div>
            <h1 className = "login-title"><GiSandwich style={{ fontSize: '50px' }}/> Unhinged <GiSandwich style={{ fontSize: '50px' }}/></h1>
            <div className="SignUpFormDiv">
                <form onSubmit={formik.handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                        >
                        <Form.Control
                            type = "user_email"
                            name = "user_email"
                            onChange={formik.handleChange}
                            value={formik.values.user_email}
                            onBlur={formik.handleBlur}
                        />
                    </FloatingLabel>
                    <p>
                        {formik.touched.user_email && formik.errors.user_email ? (
                        <h3 style={{ fontSize: '16px', color: 'red'}}>{formik.errors.user_email}</h3>
                    ) : ('')}
                    </p>
                    <FloatingLabel
                        controlId="floatingUsername"
                        label="Username"
                    >
                        <Form.Control
                        type="username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        />
                    </FloatingLabel>
                    <p>
                        {formik.touched.username && formik.errors.username ? (
                        <h3 style={{ fontSize: '16px', color: 'red'}}>{formik.errors.username}</h3>
                    ) : ('')}
                    </p>
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                    >
                        <Form.Control
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        />
                    </FloatingLabel>
                    <p>
                        {formik.touched.password && formik.errors.password ? (
                        <h3 style={{ fontSize: '16px', color: 'red'}}>{formik.errors.password}</h3>
                    ) : ('')}
                    </p>
                    <Button type="submit">Submit</Button>
                    <Button className="link-to-login" href={'/'}> Login</Button>
                </form>
            </div>
        </div>
    );
}

export default SignUp