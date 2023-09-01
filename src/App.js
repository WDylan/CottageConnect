import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResultsProvider } from './components/Result/ResultContext';
import Login from "./Views/Login/Login";
import Register from "./Views/SignIn/SignIn";
import HomePage from "./Views/HomePage/HomePage";
import Admin from "./components/Admin";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Contact from "./Views/FormContact/FormContact";
import AddCottages from "./components/AddCottages/AddCottages";
import PageProfil from "./Views/PageProfil/PageProfil";
import Faq from "./Views/FAQ/Faq";
import Cottage from "./components/Cottage/Cottage";
import Results from "./components/Result/Result";
function App() {
  return (
    <div className="App">
      <Router>
        <ResultsProvider>
          <Nav />
          <Routes>
            <Route path="/addcottage" Component={AddCottages} />
            <Route path="/" Component={HomePage} />
            <Route path="/login" Component={Login} />
            <Route path="/cottage/:id" Component={Cottage} />
            <Route path="/register" Component={Register} />
            <Route path="/results" element={<Results />} />
            <Route path="/admin" Component={Admin} />
            <Route path="/faq" Component={Faq} />
            <Route path="/contact" Component={Contact} />
            <Route path="/profil" Component={PageProfil} />
          </Routes>
          <Footer />
        </ResultsProvider>
      </Router>
    </div>
  );
}

export default App;
