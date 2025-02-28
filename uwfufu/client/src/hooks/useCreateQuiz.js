import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveQuizData } from "../localStorage/quizStorage";
import { setQuiz } from "../slices/quizSlice";

export function useCreateQuiz() {
    const [loading, setLoading] = useState(false);
    const userEmail = useSelector(state => state.user.email);
    const dispatch = useDispatch();
    
    const create = async (data) => {
        try {
            setLoading(true)
            const formData = new FormData();
            console.log(data)
            formData.append('title', data.title);
            formData.append('title_img', data.title_img);
            formData.append('category', data.category);
            formData.append('status', data.status);
            formData.append('user_email', userEmail);
            
            const request = await fetch('http://188.47.93.39:4000/create-quiz', {
                method: 'POST',
                body: formData
            })

            const response = await request.json();
            
            console.log(formData)
            if(response) {
                dispatch(setQuiz(response));
                saveQuizData(response);
            }
        } catch (error) {
            console.log(error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {loading, create}
}