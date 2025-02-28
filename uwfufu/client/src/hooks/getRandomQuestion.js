import { useState, useEffect } from "react";
import { config } from "../config";

export function useGetRandomQuestions() {
    const [loading, setLoading] = useState(false);

    const getRandomQuestions = async (data) => {
        try {
            setLoading(true);

            const request = await fetch(`http://${config.host + ":" + config.serverPort}/get-random-questions`, {
                method: 'post', 
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const response = await request.json()
        
            return response
        } catch(error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }

    return {loading, getRandomQuestions}
}