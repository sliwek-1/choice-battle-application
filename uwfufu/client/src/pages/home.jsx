import React, { useEffect } from "react";
import { Header } from "../components/header";
import { useSelector } from "react-redux";
import { useGetQuizes } from "../hooks/useGetQuizes";
import { Quizes } from "../components/quizes";


export function Home() {
    const user = useSelector((state) => state.user);


    return (
        <>
            <Header />
            <h1>Home</h1>
            <Quizes />
        </>
    )
}