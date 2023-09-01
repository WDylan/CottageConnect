import React, { useState } from "react";
import "./Accordion.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Accordion({ title, content }) {
  const [active, setActive] = useState(false);
  const handleToggle = (e) => {
    setActive(!active);
  };
  return (
    <div className="container">
      <div className={`accordion ${active && "active"}`}>
        <div className="accordionTitle" onClick={handleToggle}>
          <span className={`arrowIcon ${active && "rotateArrow"}`}>
            <ArrowForwardIosIcon />
          </span>
          {title}
        </div>
        <div className="accordionContent">{content}</div>
      </div>
    </div>
  );
}

export default Accordion;
