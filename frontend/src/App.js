import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import './App.css'
import '.'
const App = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState('');
  const [navBg, setNavBg] = useState(false);

  // console.log(apiUrl)
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  

  // change navbar background on scroll
  const changeNavBg = () => {
    window.scrollY >= 80 ? setNavBg(true) : setNavBg(false);
   }
   useEffect(() => {
     window.addEventListener('scroll', changeNavBg);
     return () => {
       window.removeEventListener('scroll', changeNavBg);
     }
   }, [])
 
  //in the routes, I am passing showAlert as the prop so that I can use alert functionality easily
  return (
    <>
      <NoteState>
        <Router>
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} navBg={navBg}/>
          <Alert alert={alert} />
          <Routes>
            {localStorage.getItem("token") ? <Route exact path="/" element={<Home showAlert={showAlert}  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} /> : <Route exact path="/" element={<Login showAlert={showAlert} apiUrl={apiUrl}/>} />}
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} apiUrl={apiUrl}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} apiUrl={apiUrl}/>} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
