import React, { useState } from "react";
import "./Connexion.scss";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Connexion() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/login", values)
      .then((res) => {
        if (res.data === "Success") {
          navigate("/");
          window.location.reload();
        } else {
          console.log(res.data);
          alert(res.data.error);
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="containerConnexion">
      <div className="loginScreen">
        <form onSubmit={handleSubmit} className="connexionForm">
          <h3>Se connecter</h3>
          <span className="inputLogin">Nom d'utilisateur</span>
          <input
            className="loginPlaceholder"
            placeholder="Utilisateur"
            type="text"
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
          <span className="inputLogin">Mot de Passe</span>
          <input
            className="loginPlaceholder"
            placeholder="Mot de Passe"
            type="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <button type="submit" className="loginButton">
            S'identifier
          </button>
          <div className="googleConnexion">
            <span>Ou continuer avec </span>
            <a href="#">
              <GoogleIcon />
            </a>
          </div>
          <div>
            <input type="checkbox" className="loginScreenSouvenir" />
            <label className="signupScreenLabelsouvenir">
              
              Se souvenir de moi
            </label>
          </div>
          <div>
            <span className="loginScreen">Vous n'avez pas de compte ? </span>
            {/* <span className="signupScreen_lien" onClick={register}>Inscrivez-vous.</span> */}
            <div
              to="#"
              className={(nav) => (nav.isActive ? "lien Active" : "lien")}
            >
              <span className="linkSignIn">
                <Link to={'/register'}>Inscrivez-vous ici</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Connexion;
