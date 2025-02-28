import { useState } from "react";
import { logoutUser } from "../slices/userSlice";
import { clearPersistedData } from "../localStorage/localstorage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export function useLogout() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const logout = () => {
        try {
            setLoading(true);
            dispatch(logoutUser());
            clearPersistedData()
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {loading, logout}
}