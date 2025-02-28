import { useState } from "react";

export function useGetQuizes() {
    const [loading, setLoading] = useState(false);

    const getQuizes = async () => {
        try {
            let request = await fetch('http://188.47.93.39:4000/get-quizes', {
                method: "post"
            })
            
            let response = await request.json()
            return response
        } catch (error) {
            throw error;
        }
    }

    return {loading, getQuizes}
}