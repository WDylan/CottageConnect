import React from "react";
import "./HomePage.scss";
import Recherche from "../../components/Recherche/Recherche";
import Filter from "../../components/Filter/Filter";
import Publier from "../../components/Publier/Publier";
import Presentation from "../../components/Presentation/Presentation";


function HomePage() {
    return (
        <div>
            <Recherche />
            <Filter />
            <Publier />
            <Presentation/>
        </div>
    )
}

export default HomePage;