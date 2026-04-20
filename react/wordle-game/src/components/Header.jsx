import "@/styles/Header.css";
import { useEffect } from "react";
export default function Header({onClick }) {

    return (
        <header className="page-header">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,1,0&icon_names=settings" />
            <h1 className="page-header__title">Wordle</h1>
                <button className="material-symbols-outlined" onClick={onClick}>settings</button> 
        </header>
    );
}