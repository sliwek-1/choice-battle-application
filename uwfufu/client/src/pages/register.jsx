import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { useRegister } from "../hooks/useRegitser";
import { Header } from "../components/header";

export function Register() {

    const { loading, register } = useRegister();
    
    const validationSchema = Yup.object({
        login: Yup.string()
            .min(2, "Login musi mieć conajmniej 2 znaki")
            .max(30, "Login może mieć maksymalnie 30 znaków")
            .required('Login jest wymagane'),
        email: Yup.string()
            .email("Adres email jest niepoprawny")
            .required('Email jest wymagany'),
        password: Yup.string()
            .min(8, "Hasło musi mieć conajmniej 8 znaków")
            .max(30, "Hasło może mieć maksymalnie 30 znaków")
            .required('Hasło jest wymagane')    
    })

    return (
        <>
        <Header />
            <main className="d-flex flex-column jusitfy-content-center align-items-center p-5">
                <Formik
                    initialValues={{
                        login: "",
                        email: "",
                        password: "",
                    }}
                    onSubmit={register}
                    validationSchema={validationSchema}
                >
                    <Form className="d-flex flex-column m-3 border p-3 rounded text-center">
                        <h1>Rejestracja</h1>

                        <div>
                            <label htmlFor="login" className="m-2">Login</label>
                            <Field id="login" className="form-control" name="login" palceholder="login"/>
                            <ErrorMessage name="login" component="div" className="error text-danger"/>
                        </div>


                        <div>
                            <label htmlFor="email" className="m-2">Email</label>
                            <Field id="email" className="form-control" name="email" palceholder="email" type="email"/>
                            <ErrorMessage name="email" component="div" className="error text-danger"/>
                        </div>

                        <div>
                            <label htmlFor="haslo" className="m-2">Hasło</label>
                            <Field id="haslo" className="form-control" name="password" palceholder="email" type="password"/>
                            <ErrorMessage name="password" component="div" className="error text-danger"/>
                        </div>

                        <Button variant="success" className="mt-3" type="submit">Zarejestruj</Button> 

                        <p>
                            Masz już konto <a href="/login">Zaloguj</a> się !
                        </p>
                    </Form>
                </Formik>
            </main>
        </>
    )
}