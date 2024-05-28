
import './App.css'
import {useLocalStorage} from "./hooks/useLocalStorage.jsx";
import {useState} from "react";
import Todos from "./pages/todos.jsx";
import {useSelector} from "react-redux";

function App() {


  return (
    <>
        <Todos/>
    </>
  )
}

export default App
