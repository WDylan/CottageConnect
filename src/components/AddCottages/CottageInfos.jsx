import React from "react";
import Reservation from "../Reservation/Reservation";

const CottageInfos = ({
  nextStep,
  handleChange,
  values,
  prestations,
  regions,
}) => {
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="caseGlobal">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.77824581129!2d2.264634977882136!3d48.858938434568685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sfr!2sfr!4v1688992494367!5m2!1sfr!2sfr"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="caseInfos">
        <h2 className="titre">Parlez-nous de votre logement.</h2>
        <label className="ddeAdresse">
          Adresse du logement
          <br />
          <br />
          <input
            className="adresse"
            type="text"
            placeholder="Adresse du logement"
            value={values.adress}
            onChange={handleChange("adress")}
          />
        </label>
        <br></br>
        <label>
          Choix d'une region
          <select
            name="regions"
            onChange={handleChange("id_regions")}
            value={values.id_regions}
          >
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ville
          <input
            type="text"
            placeholder="Ville du logement"
            value={values.city}
            onChange={handleChange("city")}
          />
        </label>

        <label>
          Code postal du logement
          <input
            type="text"
            placeholder="Code postal du logement"
            value={values.code_postal}
            onChange={handleChange("code_postal")}
          />
        </label>
        <label className="ddeAdresse">Informations supplémentaires</label>
        <br />
        <div className="infosup">
          <div>
            <label className="labels">
              Voyageurs
              <input
                className="inputs"
                type="number"
                value={values.max_personnes}
                onChange={handleChange("max_personnes")}
              />
            </label>
          </div>

          <div className="autresInfos">
            <div className="autreLabel">
              <label>
                Choix d'une prestation
                <select
                  name="categorie"
                  onChange={handleChange("id_prestation")}
                  value={values.id_prestation}
                >
                  {prestations.map((prestation) => (
                    <option key={prestation.id} value={prestation.id}>
                      {prestation.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
        <button onClick={Continue}>Suivant</button>
      </div>
    </div>
  );
};

export default CottageInfos;
