import { useState } from "react";

export function useGetQuestionDetails() {
    
    const [loading, setLoading] = useState(false);

    const getQuestionsDetails = async (id) => {
        try {
            setLoading(true);
            const request = await fetch('http://188.47.93.39:4000/get-questions/', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id})
            });

            const response = await request.json();

            return response;
            
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {loading, getQuestionsDetails}
}
