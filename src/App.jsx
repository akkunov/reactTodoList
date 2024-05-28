
import './App.css'
import {useLocalStorage} from "./hooks/useLocalStorage.jsx";

function App() {
 const [user, setUser] =  useLocalStorage('user', 'asan');
 console.log(user)
  return (
    <>
    </>
  )
}

export default App
