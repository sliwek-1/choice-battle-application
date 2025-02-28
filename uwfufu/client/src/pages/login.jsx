import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";
import { Header } from "../components/header";

export function Login() {

    const {loading, login} = useLogin();

    const validationSchema = Yup.object({
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
                        email: "",
                        password: "",
                    }}
                    onSubmit={login}
                    validationSchema={validationSchema}
                >
                    <Form className="d-flex flex-column m-3 border p-3 rounded text-center">
                        <h1>Logowanie</h1>

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

                        <Button variant="success" className="mt-3" type="submit">Zaloguj</Button> 

                        <p>
                            Nie masz konta <a href="/register">Zarejestruj</a> się !
                        </p>
                    </Form>
                </Formik>
            </main>
        </>
    )
}