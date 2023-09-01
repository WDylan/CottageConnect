import React, { useState, useEffect } from "react";
import "./Profil.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Reservation from "../Reservation/Reservation";

function Profil() {
    const [activeContent, setActiveContent] = useState("#Ip");
    const [message, setMessage] = useState("");
    const [auth, setAuth] = useState(false);
    const [data, setData] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [reservations, setReservations] = useState();
    axios.defaults.withCredentials = true;

    const handleLinkClick = (event, target) => {
        event.preventDefault();
        setActiveContent(target);
    };

    useEffect(() => {
        const reservationFetch = async () => {
            axios
                .get("http://localhost:3001/users/")
                .then((res) => {
                    if (res.data.Status === "Success") {
                        return axios.get(`http://localhost:3001/reservations/user/${res.data.id}`)
                    }
                })
                .then((res) => {
                    if (res) {
                        setReservations(res.data);
                        console.log(res);
                    } else {
                        return console.error("Not Auth");
                    }
                    })
                .catch((err) => {
                    console.log(err);
                });
        }
        const axioFetch = async () => {
            axios
                .get("http://localhost:3001/users/")
                .then((res) => {
                    if (res.data.Status === "Success") {
                        setAuth(true);
                        return axios.get(`http://localhost:3001/users/user/${res.data.id}`);
                    } else {
                        setAuth(false);
                        setMessage(res.data.Error);
                    }
                })
                .then((res) => {
                    if (res) {
                        setData(res.data);
                        setEmail(res.data.email);
                        setTelephone(res.data.phone);
                        setFirstname(res.data.firstname);
                        setLastname(res.data.lastname);
                    } else {
                        return console.log("Not Auth");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        axioFetch();
        reservationFetch();
    }, []);
    function SendInfo(e) {
        e.preventDefault();
        const CurrentData = {
            email: email ? email : null,
            phone: telephone ? telephone : null,
            firstname: firstname ? firstname : null,
            lastname: lastname ? lastname : null,
        }
        JSON.stringify(CurrentData)
        axios
            .put("http://localhost:3001/users/user/info/" + data.id, CurrentData)
            .then((res) => {
                console.log(res.data)
                if (res.data.Status === "OK") {
                    window.location.replace('/PageProfil');
                } else {
                    alert(res.data.message);
                    console.log(res);
                }
            })
            .catch((err) => console.log(err));
    };

    function SendPassword(e) {
        if (password === password2) {
            e.preventDefault();
            const CurrentData = {
                password: password
            }
            JSON.stringify(CurrentData)
            axios
                .put("http://localhost:3001/users/user/pass/" + data.id, CurrentData)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.Status === "OK") {
                        window.location.replace('/profil');
                    } else {
                        alert(res.data.message);
                        console.log(res);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            window.alert('Les mots de passes ne correspondent pas.')
        }

    };

    function DelAccount() {
        if (window.confirm('Voulez-vous vraiment supprimer votre compte?')) {
            axios
            .delete("http://localhost:3001/users/user/" + data.id)
            .then((res) => {
                console.log(res.data)
                if (res.data.Status === "OK") {
                    window.location.replace('/profil');
                } else {
                    alert(res.data.message);
                    console.log(res);
                }
            })
            .catch((err) => console.log(err));

            axios
            .get("http://localhost:3001/users/logout")
            .then(() => {
              window.location.reload();
            })
            .catch((err) => console.log(err));
        }
    }


    return (
        <div class="containerProfil">
            <div class="menuProfil">
                <ul>
                    <li><a href="#Ip" onClick={(event) => handleLinkClick(event, "#Ip")}>Informations personnelles</a></li>
                    <li><a href="#Mdp" onClick={(event) => handleLinkClick(event, "#Mdp")}>Mot de passe</a></li>
                    <li><a href="#Rs" onClick={(event) => handleLinkClick(event, "#Rs")}>Mes réservation</a></li>
                    <li><a href="#Smc" onClick={(event) => handleLinkClick(event, "#Smc")}>Supprimer mon compte</a></li>
                </ul>
            </div>
            {auth ? (
                <div class="contentProfil">
                    <div id="Ip" style={{ display: activeContent === "#Ip" ? "block" : "none" }}>
                        <form onSubmit={SendInfo} className="formProfil">

                            <ul>
                                <li>
                                    <label htmlFor="texte1">Adresse mail</label><br />
                                    <input type="text" id="texte1" name="texte1" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="texte2">Téléphone</label><br />
                                    <input type="text" id="texte2" name="texte2" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="texte4">Nom</label><br />
                                    <input type="text" id="texte4" name="texte4" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="texte5">Prenom</label><br />
                                    <input type="text" id="texte5" name="texte5" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="texte6">Adresse</label><br />
                                    <input type="text" id="texte6" name="texte6" />
                                </li>
                                <li>
                                    <label htmlFor="texte7">Code postal</label><br />
                                    <input type="text" id="texte7" name="texte7" />
                                </li>
                                <li>
                                    <label htmlFor="texte8">Ville</label><br />
                                    <input type="text" id="texte8" name="texte8" />
                                </li>
                            </ul>

                            <button type="submit" className="buttonProfil">Confirmer</button>
                        </form>
                    </div>
                    <div id="Mdp" style={{ display: activeContent === "#Mdp" ? "block" : "none" }}>
                        <form onSubmit={SendPassword} className="formProfil">
                            <ul>
                                <li>
                                    <label htmlFor="texte1">Nouveau mot de passe</label><br />
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="texte1" name="texte1" />
                                </li>
                                <li>
                                    <label htmlFor="texte2">Confirmer votre nouveau mot de passe</label><br />
                                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} id="texte2" name="texte2" />
                                </li>
                            </ul>

                            <button className="buttonProfil" type="submit">Confirmer</button>
                        </form>
                    </div>
                    <div id="Rs" style={{ display: activeContent === "#Rs" ? "block" : "none" }}>
                            <ul> 
                
                                {!reservations ? (
                                        <p> En chargement</p>
                                    ) : (
                                        reservations.map((reservation, index) => (
                                            <Reservation key={index} id={reservation.id} date_start={reservation.date_start} date_end={reservation.date_end} duration={reservation.duration} nombre_personnes={reservation.nombre_personnes} total={reservation.total}/>
                                            
                                        ))
                                    )}
                                
                            </ul>
                    </div>
                    <div id="Smc" style={{ display: activeContent === "#Smc" ? "block" : "none" }}>
                        <p className="deleteTxt">Une fois votre compte supprimé, vos données personnelles,vos réservations <br />ainsi que toutes vos
                            factures seront définitivement perdues.</p>
                        <button className="buttonProfilDelete" type="button" onClick={DelAccount}>Supprimer mon compte</button>
                    </div>

                </div>
            ) : (
                <div>
                    <h3> {message}</h3>

                    <Link to="/login">
                        <h3> Login Now</h3>
                    </Link>
                </div>
            )}
        </div>
    )
}
export default Profil;