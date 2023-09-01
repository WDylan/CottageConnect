import React from "react";
import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footerRow">
        <div className="footerSection">
          <div className="footerNewsletter">
            <h3 className="newsletterTitle">Abonnez-vous à notre Newsletter</h3>
            <form className="formNewsletter">
              <input
                type="email"
                name="email"
                placeholder="Adresse e-mail"
                className="footerInput"
              />
            </form>
          </div>
        </div>

        <div className="footerSection">
          <div className="footerPropos">
            <h3 className="proposTitle">Nos destinations favorites</h3>
          </div>
        </div>

        <div className="footerSection">
          <div className="footerContact">
            <h3 className="contactTitle">
              <Link to={"/contact"} className="contactLink">
                Nous contacter
              </Link>
            </h3>
            <h3 className="contactTitle">
              <Link className="contactLink" to={"/faq"}>
                FAQ
              </Link>
            </h3>

            <div className="footerSocials">
              <a href="./" className="footerSocial">
                <img
                  src="http://localhost:3000/img/facebook.png"
                  alt="Facebook"
                />
              </a>
              <a href="./" className="footerSocial">
                <img
                  src="http://localhost:3000/img/instagram.png"
                  alt="Instagram"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
