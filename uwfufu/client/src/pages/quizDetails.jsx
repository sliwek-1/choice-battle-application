import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { useGetQuizDetails } from "../hooks/getQuizDetails";
import { useGetQuestionDetails } from "../hooks/getQuestionsDetails";
import { useGetRandomQuestions } from "../hooks/getRandomQuestion";
import { Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { config } from "../config";
import * as Yup from "yup";


export function QuizDetalis() {
    const { id } = useParams()
    const [quiz, setQuiz] = useState([])
    const [questions, setQuestions] = useState([])
    const [roundsCount, setRoundsCount] = useState([])
    const {loadingQuiz, getQuizDetails} = useGetQuizDetails();
    const {loadingQuestions, getQuestionsDetails} = useGetQuestionDetails();
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async (id) => {
            try {
                const quizData = await getQuizDetails(id);
                setQuiz(quizData);

                const questionsData = await getQuestionsDetails(id)
                setQuestions(questionsData)

                if (questionsData && questionsData.length) {
                    const count = getAmountOfRounds(questionsData);
                    setRoundsCount(count); 
                }
            } catch (error) {
                throw error;
            }
        }
        getData(id)
    }, [])

    const initialValues = {
        count: "",
        id: ""
    }

    const validationSchema = Yup.object({   
        count: Yup.string().required('Ta opcja jest wymagana')
        .notOneOf([''], "Wybierz właściwą opcje"),
    })

    const getAmountOfRounds = (quizData) => {
        const lenOfQuiz = quizData.length;
        const rounds = [];
    
        if (lenOfQuiz >= 8) {
            for (let i = 4; i < lenOfQuiz; i *= 2) {
                rounds.push(i);
            }
        }
        return rounds;
    }

    const handleOnSubmit = async (data) => {
        try {            
            navigate("/quiz/"+data.count+"/"+id)
        } catch (error) {   
            throw error;
        }
    }

    return (
        <>
            <Header />
            <section className="d-flex flex-column align-items-center">
                <img src={`http://${config.host + ":" + config.port}/` + quiz.title_img} alt={quiz.title} style={{width: "80vw", height: "20vh", objectFit: 'cover'}}/>
                <div className="my-2" style={{width: "80vw", height: "20vh"}}>
                    <h2>{quiz.title}</h2>
                    <p>Kategoria: {quiz.category}</p>
                </div>
                <div className="d-flex align-items-center" style={{width: "80vw", height: "5vh"}}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleOnSubmit}
                    >
                        {(values) => (
                            <Form className="d-flex">
                                <Field as="select" name="count" id="count" className="form-control mx-2" style={{width: "15vw"}}>
                                    <option value="">Wybirz runde</option>
                                    {roundsCount.length > 0 ? roundsCount.map(rounds => (
                                        <option value={rounds*2}>Round of {rounds*2}</option>
                                    )) : null}
                                </Field>
                                {values.values.count == "" ? 
                                    <Button className="primary mx-5" type="submit" style={{width: "10vw"}} disabled>Graj</Button>
                                    :
                                    <Button className="primary mx-5" type="submit" style={{width: "10vw"}}>Graj</Button>
                                }
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>

            <section className="d-flex align-items-center justify-content-center flex-column my-5" style={{width: "100vw", height: "auto"}}>
                <h3>Wszystkie Pytania</h3>
                {questions.map((question, i) => (
                    <div className="d-flex align-items-center p-3 my-2 border" style={{width: "45vw", height: "15vh", borderRadius: "10px"}}>
                        <p>{i + 1}.</p>
                        <img src={`http://${config.host + ":" + config.serverPort}/` + question.source} alt={question.title} style={{width: "10vw", height: "10vh", objectFit: "contain"}} />
                        <p>{question.title}</p>
                    </div>
                ))}
            </section>
        </>
    )
}