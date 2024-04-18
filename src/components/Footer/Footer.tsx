import React from "react";
import facebookIcon from "/icons/facebook.svg";
import instagramIcon from "/icons/instagram.svg";
import logoIcon from "/icons/bulbFooterIcon.svg";
import logoTextFooter from "/icons/logoFooterIcon.svg";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <div id="contact" className="footerContainer">
      <div>
        <h6 className="socialMedia">Follow on social service:</h6>
        <div className="socialMediaIcons">
          <a href="https://www.facebook.com/" target="_blank">
            <img className="facebookIcon" src={facebookIcon} alt="facebook" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <img
              className="instagramIcon"
              src={instagramIcon}
              alt="instagram"
            />
          </a>
        </div>
      </div>
      <div className="contacts">
        <h6>Contact:</h6>
        <p>Send us an Email:</p>
        <a className="Email" href="mailto:lern@example.com">
          lern@example.com
        </a>
        <p>Phone:</p>
        <a className="phone" href="tel:+4900000000">
          +4900000000
        </a>
      </div>
      <div className="logoFooter">
        <img src={logoIcon} alt="bulbFooterIcon" />
        <img src={logoTextFooter} alt="logoFooterIcon" />
      </div>
    </div>
  );
};

export default Footer;
