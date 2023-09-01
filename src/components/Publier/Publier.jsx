import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Publier.scss";
import { checkAuth } from "../auth";


function Publier() {
    const [auth, setAuth] = useState(false);
    const [admin, setAdmin] = useState(false);
  
    useEffect(() => {
      checkAuth(setAuth, setAdmin);
    }, []);
  
    const navigate = useNavigate();
    const handleNavigate = (e) => {
        e.preventDefault()
        if (auth){

            navigate('/addcottage')
        }
        else {
            navigate('/login')
        }
    }
    return (
        <div className="containerPublier">
            <h3>Commencez dès maintenant votre activité !</h3>
            <div className="publishAnnonce">
                <button onClick={handleNavigate} className="publishBtn">Publier mon annonce</button>
            </div>
        </div>
    );
}

export default Publier;