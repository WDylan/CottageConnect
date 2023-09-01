import React from "react";
import "./Presentation.scss";

function Presentation() {
    return (
        <div className="containerPresentation">
            <h3>Qui sommes nous</h3>
            <div className="containerPresent">
                <div className="presentationText"><h3>Bienvenue chez Casa Mea</h3>

Votre destination privilégiée pour la location de gîtes exceptionnels. 
<br/>
<br/>
Chez Casa Mea, nous comprenons l'importance de se sentir chez soi, même loin de chez soi. 
C'est pourquoi nous avons soigneusement sélectionné une collection de gîtes de charme, chacun avec son propre caractère et son ambiance chaleureuse.
<br/><br/>
Nous nous engageons à vous offrir un séjour exceptionnel en mettant l'accent sur la qualité, le confort et le service personnalisé.
<br/><br/>
Notre équipe dévouée est là pour vous guider tout au long du processus de réservation et répondre à toutes vos questions.
<br/><br/>
Que vous soyez à la recherche d'une escapade tranquille à la campagne, d'une aventure en plein air ou d'une expérience urbaine animée, Casa Mea est là pour vous accompagner dans la réalisation de vos rêves de voyage.
<br/><br/>
Réservez dès maintenant votre gîte de rêve et préparez vous à vivre des moments inoubliables.
<br/>
Bienvenue chez Casa Mea, où chaque gîte est une maison pour vous.
</div>
                <div className="presentationImg"><img className="qsn" src="./img/qsn.webp" alt="Image" /></div>
            </div>
        </div>
    )
}

export default Presentation;