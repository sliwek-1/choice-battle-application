import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useGetQuizes } from "../hooks/useGetQuizes";
import { Button } from "react-bootstrap";


export function Quizes() {
    const user = useSelector((state) => state.user);
    const {loading, getQuizes} = useGetQuizes();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const getQuiz = async () => {
            try {
                let result = await getQuizes();
                setQuizzes(result)
            } catch (error) {
                throw error;
            }
        }

        getQuiz()
    }, [])

    return (
        <>
            {quizzes.length > 0 ? 
            <div className="d-flex justify-content-around flex-wrap flex-start">
                {quizzes.map(quiz => (
                    <div className="d-flex flex-column align-items-center border my-2" style={{width: "38vw", height: "45vh", borderRadius: "10px"}}>
                        <img src={"http://188.47.93.39:4000/" + quiz.title_img} alt={quiz.title} className="p-1" style={{width: "35vw", height: "20vh", objectFit: "cover"}}/>
                        <p>{quiz.title}</p>
                        <p>{quiz.status}</p>
                        <p>{quiz.owner_id == user.id ? "Mój Quiz" : null}</p>
                        <Button className="primary" href={"http://188.47.93.39:3000/quiz-details/" + quiz.id} style={{width: "35vw"}}>Graj</Button>
                    </div>
                ))}
            </div> : <p>Nie znaleziono quizów</p>}
        </>
    )
}