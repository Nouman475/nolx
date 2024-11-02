import React from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
const Footer = () => {
  const socialLinks = [
    { 
      icon: <FacebookOutlined />,
      link: "https://www.facebook.com",
      alt: "Facebook",
    },
    {
      icon: <InstagramOutlined />,
      link: "https://www.instagram.com",
      alt: "Instagram",
    },
    {
      icon: <TwitterOutlined />,
      link: "https://www.twitter.com",
      alt: "Twitter",
    },
    {
      icon: <YoutubeOutlined />,
      link: "https://www.youtube.com",
      alt: "YouTube",
    },
  ];

  return (
    <footer className="footer" style={{ background: "rgba(0, 47, 52, .03)" }}>
      <div className="container-fluid">
        <div className="row" id="upper" >
          <div className="col-6 d-flex justify-content-end">
            <img
              src="https://www.olx.com.pk/assets/olxMobileApp.f5579f77e849b600ad60857e46165516.webp"
              alt="olx-banner"
            />
          </div>
          <div
            className="col-6 d-flex justify-content-center group"
            id="border"
          >
            <p>Get your app today</p>
            <div className="d-flex">
              <a href="/" tabIndex="0">
                <img
                  className="bn45"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                  alt="Google Play"
                />
              </a>
              <a href="/" tabIndex="0">
                <img
                  className="bn46"
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="footer">
          <ul className="footer__nav">
            <li className="nav__item">
              <h2 className="nav__title">Popular Categories</h2>
              <ul className="nav__ul">
                <li>
                  <a href="/">Cars</a>
                </li>
                <li>
                  <a href="/">Flats for rent</a>
                </li>
                <li>
                  <a href="/">Mobile Phones</a>
                </li>
                <li>
                  <a href="/">Jobs</a>
                </li>
              </ul>
            </li>

            <li className="nav__item nav__item--extra">
              <h2 className="nav__title">Trending Searches</h2>
              <ul className="nav__ul nav__ul--extra">
                <li>
                  <a href="/">Bikes</a>
                </li>
              </ul>
            </li>

            <li className="nav__item">
              <h2 className="nav__title">About Us</h2>
              <ul className="nav__ul">
                <li>
                  <a href="/">About Dubizzle Group</a>
                </li>
                <li>
                  <a href="/">OLX Blog</a>
                </li>
                <li>
                  <a href="/">Contact Us</a>
                </li>
                <li>
                  <a href="/">OLX for Businesses</a>
                </li>
              </ul>
            </li>

            <li className="nav__item">
              <h2 className="nav__title">Help</h2>
              <ul className="nav__ul">
                <li>
                  <a href="/">Sitemap</a>
                </li>
                <li>
                  <a href="/">Terms of Use</a>
                </li>
                <li>
                  <a href="/">Privacy Policy</a>
                </li>
              </ul>
            </li>
          </ul>

          <div className="footer__addr">
            <div className="nav__title">Follow us</div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                
                margin: "20px 0",
              }}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.alt}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#f0f0f0",
                    textDecoration: "none",
                    color: "#000",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e0e0e0")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="d-flex">
              <a href="/" tabIndex="0">
                <img
                  className="bn45"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                  alt="Google Play"
                />
              </a>
              <a href="/" tabIndex="0">
                <img
                  className="bn46"
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                />
              </a>
            </div>
          </div>

          <div className="legal px-3 container-fluid" style={{backgroundColor:"#002f34;" ,color:"#fffff"}}>
            <p className="text-white mt-3">&copy; {new Date().getFullYear()} All rights reserved.</p>
            <div className="legal__links">
              <span>
                Made with <span className="heart">♥</span> By M Nouman The Developer
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
