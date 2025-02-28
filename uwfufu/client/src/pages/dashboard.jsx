import {useState} from "react";
import { Header } from "../components/header";
import { Creator } from "../components/creator";
import { useSelector } from "react-redux";
import { AddQuestions } from "../components/add-qustions";
import { QuizHeader } from "../components/quiz-header";

export function Dashboard() {
    const quiz = useSelector(state => state.quiz);
    return (
        <>
            <Header />
            <div className="d-flex flex-row justify-content-around">
                {Object.keys(quiz).length > 1 ? <QuizHeader/> : <Creator />}
                <AddQuestions />
            </div>
        </>
    )
}