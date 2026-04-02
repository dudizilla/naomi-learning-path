"use client"
import Header from "./Header"
import GameBoard from "./GameBoard";
import InfoBlock from "./InfoBlock";
import Keyboard from "./Keyboard";
import "@/styles/App.css"

export default function App() {
  return (
    <>
    <Header/>
    <InfoBlock/>
    <GameBoard/>
    <Keyboard/>
    </>
  );
}