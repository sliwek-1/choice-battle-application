import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";

export function Header() {
    const user = useSelector((state) => state.user);
    const {loading, logout} = useLogout();
    
    return (
        <header className="d-flex justify-content-between align-items-center p-2">
            <p className="fw-bold"><a href="/">Aplikacja test</a></p>
            <div>
                {!user.token ? 
                <div className="d-flex justify-content-end">
                    <Button href="/login" variant="primary" className="m-2">Zaloguj</Button>
                    <Button href="/register" variant="primary" className="m-2">Zarejestruj</Button>
                </div>
                :
                <div className="d-flex p-2 justify-content-end">
                    <p className="m-2 p-2">{user.login}</p>
                    <Button href="/dashboard" variant="primary" className="m-2">Dodaj</Button>
                    <Button variant="danger" className="m-2" onClick={logout}>Wyloguj</Button>
                </div>}
            </div>
        </header>
    )
}