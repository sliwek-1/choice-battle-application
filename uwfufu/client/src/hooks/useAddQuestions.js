import React, { useState } from "react";
import { useSelector } from "react-redux";

export function useQuestion() {
    const [loading, setLoading] = useState(false)
    const quizID = useSelector(state => state.quiz.quiz_id);
    const email = useSelector(state => state.user.email)
    const quiz = useSelector(state => state.quiz);

    const createQuestions = async (questions) => {
        try {
            setLoading(true)
            const formData = new FormData();
            questions.forEach(async (question,i) => {
                try {
                    formData.append(`file_${i}`, question.file);
                    formData.append(`title_${i}`, question.title);
                    formData.append(`quiz_${i}`, quizID);
                    formData.append(`user_${i}`, email);
                } catch (error) {
                    throw error
                }
            })
            console.log(formData, quiz)
            const request = await fetch('http://188.47.93.39:4000/add-questions/', {
                method: 'post',
                body: formData
            })

            const response = await request.json()
            console.log(response)
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {loading, createQuestions}
}