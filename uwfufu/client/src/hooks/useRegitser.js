import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export function useRegister() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (data) => {
        try {   
            setLoading(true)
            
            let request = await fetch('http://188.47.93.39:4000/register', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            
            let response = await request.text();

            if(response == 'succes') {
                navigate('/login')
            }
            
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false)
        }
    }

    return { loading, register }
}