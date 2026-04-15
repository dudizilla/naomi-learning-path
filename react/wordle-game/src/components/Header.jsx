import "@/styles/Header.css";

export default function Header() {
    return (
        <header className="page-header">
             <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,1,0&icon_names=settings" />
            <h1 className="page-header__title"> Wordle </h1>
            <span class="material-symbols-outlined">settings</span>
        </header>
    );
}
