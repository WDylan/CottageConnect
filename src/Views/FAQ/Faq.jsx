import React from "react";
import './Faq.scss';
import Accordion from '../../components/Accordion/Accordion';

function Faq() {
    return (
        <div className="backgroundAccordion">
            <div className="containerAccordion">
                <h3>Titre de la catégorie FAQ</h3>
                <div className="accordion">
                    <Accordion title="Question" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate, fugiat nemo velit quod impedit, eveniet odio tempore voluptates sit quae labore, cum incidunt accusamus!" />
                    <Accordion title="Question" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate, fugiat nemo velit quod impedit, eveniet odio tempore voluptates sit quae labore, cum incidunt accusamus!" />
                    <Accordion title="Question" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate, fugiat nemo velit quod impedit, eveniet odio tempore voluptates sit quae labore, cum incidunt accusamus!" />
                    <Accordion title="Question" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate, fugiat nemo velit quod impedit, eveniet odio tempore voluptates sit quae labore, cum incidunt accusamus!" />
                    <button className="containerMore">Plus de question</button>
                </div>
            </div>
        </div>
    )
}
export default Faq;