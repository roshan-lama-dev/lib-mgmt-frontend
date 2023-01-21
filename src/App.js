import "./App.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Books from "./pages/Books"
import AddBook from "./pages/AddBook"
import MyBooks from "./pages/MyBooks"
import Transactions from "./pages/Transactions"
import Profile from "./pages/Profile"
import { useEffect, useState } from "react"

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const u = JSON.parse(sessionStorage.getItem("user"))
    setUser(u)
  }, [])
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile" element={<Profile currentUser={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
