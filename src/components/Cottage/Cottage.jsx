import { CircularProgress } from "@mui/material";
import axios from "axios";
import "./Cottage.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Cottage() {
  const { id } = useParams();
  const [cottageData, setCottageData] = useState(null);
  const [adressData, setAdressData] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [region, setRegion] = useState(null);
  const [categorie, setCategorie] = useState(null);
  const [arrivee, setArrivee] = useState("");
  const [depart, setDepart] = useState("");
  const [voyageurs, setVoyageurs] = useState("");
  const [userId, setUserId] = useState("");

  const calculateDuration = (dateStart, dateEnd) => {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    const durationMs = end - start;
    const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));

    return durationDays;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const duration = calculateDuration(arrivee, depart);
    const total =
      duration * cottageData.dayprice * voyageurs + cottageData.caution;

    const data = {}
    data.date_start = arrivee
    data.date_end = depart
    data.duration = duration
    data.nombre_personnes = voyageurs
    data.total = total
    data.id_cottages = id
    data.id_client = userId
    try {
      axios
        .post("http://localhost:3001/reservations/", data)
        .then ((res) => {
          console.log(res.data);
          alert('Votre reservation a bien était pris en compte du :' + data.date_start, 'au :' + data.date_end)
        }, (err) => {
          alert(err.response.data.message);
        })
      
    } catch (error) {
      console.error(error);
    }
  };

  // CACHE DES DATES DISPARAISSANT AU CLIC ET REAPARAISSANT EN CLIQUANT AILLEURS
  const [isLabelArriveeHidden, setLabelArriveeHidden] = useState(false);
  const [isLabelDepartHidden, setLabelDepartHidden] = useState(false);

  const handleArriveeClick = () => {
    setLabelArriveeHidden(true);
  };

  const handleDepartClick = () => {
    setLabelDepartHidden(true);
  };

  const handleArriveeBlur = (event) => {
    if (event.target.value === "") {
      setLabelArriveeHidden(false);
    }
  };

  const handleDepartBlur = (event) => {
    if (event.target.value === "") {
      setLabelDepartHidden(false);
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const userRes = await axios.get("http://localhost:3001/users");
        setUserId(userRes.data.id);
        const cottageRes = await axios.get(
          `http://localhost:3001/cottages/cottage/${id}`
        );
        const cottageData = cottageRes.data;
        setCottageData(cottageData);
        try {
          const cottageImageRes = await axios.get(
            `http://localhost:3001/pictures/cottage/${id}`
          );
          const imageRes = await axios.get(
            `http://localhost:3001/pictures/image/${cottageImageRes.data.picture_name}`,
            { responseType: "blob" }
          );
          const imageUrl = URL.createObjectURL(imageRes.data);
          setImgUrl(imageUrl);
        } finally {
          const adressRes = await axios.get(
            `http://localhost:3001/adress/${cottageData.id_adress}`
          );
          const adressData = adressRes.data;
          setAdressData(adressData);

          const categorie = await axios.get(
            `http://localhost:3001/categories/${cottageData.id_categories}`
          );
          setCategorie(categorie.data.name);

          const region = await axios.get(
            `http://localhost:3001/regions/${adressData.id_regions}`
          );
          setRegion(region.data.name);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatas();
  }, [id]);
  return (
    <div className="Cottage">
      {cottageData && adressData ? (
        <div>
          {imgUrl ? (
            <img src={imgUrl} alt="" />
          ) : (
            <img src="http://localhost:3000/img/rien.jpg" alt="rien" />
          )}
          <div>
            <p>Categorie: {categorie}</p>
            <p>Name: {cottageData.name}</p>
            <p>Adresse: {adressData.adress}</p>
            <p>Region: {region}</p>
            <p>Ville: {adressData.city}</p>
            <p>Code Postal: {adressData.code_postal}</p>
            <p>Content: {cottageData.content}</p>
            <p>Max de voyageurs: {cottageData.max_personnes}</p>
            <p>Day Price: {cottageData.dayprice}</p>
            <p>Caution: {cottageData.caution}</p>
          </div>
          <form className="infoEcrit" onSubmit={handleFormSubmit}>
            <div className="conteneurSearch">
              <div className="champSearchLabel customDate">
                <label
                  htmlFor="arrivee"
                  className={`labelDate ${
                    isLabelArriveeHidden ? "cd1Hidden" : ""
                  }`}
                  min="2023-01-01"
                  max="2040-01-01"
                  onClick={handleArriveeClick}
                >
                  Arrivée
                </label>
                <input
                  title="Arrivée"
                  className="champSearch date"
                  type="date"
                  name="arrivee"
                  id="arrivee"
                  value={arrivee}
                  onChange={(event) => setArrivee(event.target.value)}
                  onBlur={handleArriveeBlur}
                />
              </div>

              <div className="champSearchLabel customDate">
                <label
                  htmlFor="depart"
                  className={`labelDate ${
                    isLabelDepartHidden ? "cd2Hidden" : ""
                  }`}
                  min="2023-01-01"
                  max="2040-01-01"
                  onClick={handleDepartClick}
                >
                  Départ
                </label>

                <input
                  placeholder="Départ"
                  className="champSearch date"
                  type="date"
                  name="depart"
                  id="depart"
                  value={depart}
                  onChange={(event) => setDepart(event.target.value)}
                  onBlur={handleDepartBlur}
                />
              </div>
            </div>

            <br />
            <div className="voyag">
              <select
                className="champSearch"
                name="voyageurs"
                id="voyageurs"
                value={voyageurs}
                onChange={(event) => setVoyageurs(event.target.value)}
              >
                <option value="0">Nombre de voyageurs</option>
                <option value="1">1 Voyageur</option>
                <option value="2">2 Voyageurs</option>
                <option value="3">3 Voyageurs</option>
                <option value="4">4 Voyageurs</option>
                <option value="5">5 Voyageurs</option>
                <option value="6">6 Voyageurs</option>
                <option value="7">7 Voyageurs</option>
                <option value="8">8 Voyageurs</option>
                <option value="9">9 Voyageurs</option>
                <option value="10">10 Voyageurs</option>
                <option value="11+">11 et plus</option>
              </select>
            </div>
            <br />
            <button className="champSearch vert boutonVert" type="submit">
              Reserver
            </button>
          </form>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
