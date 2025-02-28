import { useState } from "react";
import { Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage, option } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useCreateQuiz } from "../hooks/useCreateQuiz";

export function Creator() {

    const {loading, create} = useCreateQuiz();
    
    const validationSchema = Yup.object({   
        title: Yup.string().required('Tytuł jest wymagany')
        .min(1, "Tytuł nie może być pusty")
        .max(100, "Tytuł może mieć maksymalnie 100 znaków"),
        category: Yup.string().required('Ta opcja jest wymagana')
        .notOneOf([''], "Wybierz właściwą opcje"),
        status: Yup.string().required('Ta opcja jest wymagana')
        .notOneOf([''], "Wybierz właściwą opcje"),
    })

    return (
        <div className="p-3">
            <div className="header d-flex flex-column">
                <h3 className="x-2">Stwórz Quiz</h3>
                <Formik
                initialValues={{
                    title: "",
                    title_img: null,
                    category: "",
                    status: ""
                }}
                onSubmit={create}
                validationSchema={validationSchema}
                >
                    {({setFieldValue}) => (
                            <Form className="m-3 d-flex flex-column">
                            <div className="mt-3">
                                <label htmlFor="title">Tytuł</label>
                                <Field id="title" name="title" type="text" className="form-control"/>
                                <ErrorMessage name="title" component="div" className="error text-danger"/>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="title_img">Obrazek Tytułowy</label>
                                <input id="title_img" name="title_img" type="file" className="form-control" onChange={(e) => {
                                    setFieldValue("title_img", e.currentTarget.files[0])
                                }}/>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="category">Kategoria</label>
                                <Field id="category" name="category" as="select" className="form-control">
                                    <option value="">Wybierz Kategorie</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Rozrywka">Rozrywka</option>
                                    <option value="Nauka">Nauka</option>
                                    <option value="Seriale i Filmy">Seriale i Filmy</option>
                                    <option value="Motoryzacja">Motoryzacja</option>
                                    <option value="Moda">Moda</option>
                                    <option value="Muzyka">Muzyka</option>
                                    <option value="Polityka">Polityka</option>
                                </Field>
                                <ErrorMessage name="category" component="div" className="error text-danger"/>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="status">Kategoria</label>
                                <Field id="status" name="status" as="select" className="form-control">
                                    <option value="">Widoczność</option>
                                    <option value="Publiczne">Publiczne</option>
                                    <option value="Prywatne">Prywatne</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="error text-danger"/>
                            </div>

                            <Button variant="primary" type="submit" className="my-3">Zapisz</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}