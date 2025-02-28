import { useState } from "react";
import { config } from "../config";

export function useGetQuizes() {
    const [loading, setLoading] = useState(false);

    const getQuizes = async () => {
        try {
            let request = await fetch(`http://${config.host + ":" + config.serverPort}/get-quizes`, {
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