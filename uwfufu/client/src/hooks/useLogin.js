import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../slices/userSlice";
import { savePersistedData } from "../localStorage/localstorage";
import { useDispatch } from "react-redux";
import { config } from "../config";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const login = async (data) => {
        try {   
            const reqest = await fetch(`http://${config.host + ":" + config.serverPort}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })

            const res = await reqest.json();
            
            if(res) {
                dispatch(loginUser(res));
                savePersistedData(res);
                navigate('/');
            } else {
                console.log('Something went wrong');
            }

        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {loading, login}
}