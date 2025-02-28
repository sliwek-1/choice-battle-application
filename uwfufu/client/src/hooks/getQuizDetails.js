import { useState } from "react";

export function useGetQuizDetails() {
    
    const [loading, setLoading] = useState(false);

    const getQuizDetails = async (id) => {
        try {
            setLoading(true);
            const request = await fetch('http://188.47.93.39:4000/get-quiz/', {
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

    return {loading, getQuizDetails}
}

