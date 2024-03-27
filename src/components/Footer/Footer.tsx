import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div id="contact" className="footerContainer">
      <div>
        <h6 className="socialMedia">Follow on social service:</h6>
        <div className="socialMediaIcons">
          <a href="https://www.facebook.com/" target="_blank">
            <img
              className="facebookIcon"
              src="./icons/facebook.svg"
              alt="facebook"
            />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <img
              className="instagramIcon"
              src="./icons/instagram.svg"
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
        <img src="./icons/bulbFooterIcon.svg" alt="bulbFooterIcon" />
        <img src="./icons/logoFooterIcon.svg" alt="logoFooterIcon" />
      </div>
    </div>
  );
};

export default Footer;
