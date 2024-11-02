import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import AdsByCategory from "../AdsRoutes/byCategory";
import { useNavigate } from "react-router-dom";
const { Panel } = Collapse;

const navItems = [
  "All categories ▼",
  "Mobile Phones",
  "Cars",
  "Motorcycles",
  "Houses",
  "Video-Audios",
  "Tablets",
  "Land & Plots"
];

export default function HomePage() {
  const categories = [
    {
      image:
        "https://www.olx.com.pk/assets/mobiles.8c768c96bfde33f18fcf5af2a8b9cf71.png",
      caption: "Mobile",
      url:"Mobile"
    },
    {
      image:
        "https://www.olx.com.pk/assets/vehicles.29fb808d5118f0db56f68a39ce5392e2.png",
      caption: "Vehicle",
      url:"Vehicle"
    },
    {
      image:
        "https://www.olx.com.pk/assets/property-for-sale.e3a00dbfdaa69fe5f713665f1069502f.png",
      caption: "Property for Sale",
      url:"Property"
    },
    {
      image:
        "https://www.olx.com.pk/assets/property-for-rent.8436595fbaa90d47f0178006f57090a8.png",
      caption: "Property for Rent",
      url:"Property"
    },
    {
      image:
        "https://www.olx.com.pk/assets/electronics-home-appliances.46e034dd8adca44625c2c70e4d1b5984.png",
      caption: "Electronics and Home Appliances",
      url:"Electronics"
    },
    {
      image:
        "https://www.olx.com.pk/assets/bikes.4dcd02c49b2b83aa5b4d629d1e2b383e.png",
      caption: "Bikes",
      url:"Bikes"
    },
    {
      image:
        "https://www.olx.com.pk/assets/business-industrial-agriculture.704a6ffb9081bc94b11c102cc613670f.png",
      caption: "Business, Agricultural and Industrial",
      url:"Business"
    },
    {
      image:
        "https://www.olx.com.pk/assets/services.dc6aef196c0403dc61b0ee813f66fa5b.png",
      caption: "Services",
      url:"Services"
    },
    {
      image:
        "https://www.olx.com.pk/assets/jobs.79e6136dda02111cf8e7afe26b9e0f93.png",
      caption: "Jobs",
      url:"Jobs"
    },
    {
      image:
        "https://www.olx.com.pk/assets/animals.62d396e85f7523dbc8ff23889fdd5c31.png",
      caption: "Animals",
      url:"Animals"
    },
    {
      image:
        "https://www.olx.com.pk/assets/furniture-home-decor.66bcf157a53ea4c736a5b0af41219475.png",
      caption: "Furniture and Home Decor",
      url:"Furniture"
    },
    {
      image:
        "https://www.olx.com.pk/assets/fashion-beauty.dd2cf7638c29b0e5c084a6673dd94dd7.png",
      caption: "Fashion and Beauty",
      url:"Fashion"
    },
    {
      image:
        "https://www.olx.com.pk/assets/books-sports-hobbies.6fee8d841b332d65a10f050f4a2ee1c8.png",
      caption: "Books, Sports and Hobbies",
      url:"Books"
    },
    {
      image:
        "https://www.olx.com.pk/assets/kids.cd8d8864804f1c35dd6a7df68268a48d.png",
      caption: "Children",
      url:"Children"
    },
  ];

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 600);

  // Function to calculate and update screen width state
  const calculateWidth = () => {
      setIsLargeScreen(window.innerWidth > 600);
  };

  const navigate = useNavigate()

  // Effect to add event listener for window resize
  useEffect(() => {
      window.addEventListener('resize', calculateWidth);
      return () => {
          window.removeEventListener('resize', calculateWidth); // Cleanup on unmount
      };
  }, []);

  return (
    <main>
      <hr className="mt-0 pt-0"/>
      <div className="container">
      {isLargeScreen ? (
                <ul className="horizontal-list mb-4" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    {navItems.map((item, index) => (
                        <li key={index} style={{ fontSize:"13px", marginRight: '25px', display: 'inline' }} className="hov my-2">
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <Collapse defaultActiveKey={['1']} style={{ marginBottom: '20px' }}>
                    <Panel header="Categories" key="1">
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                            {navItems.map((item, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Panel>
                </Collapse>
            )}
      </div>
      {/*END OF 2nd NAVBAR */}
      <div className="my-3 container">
        {/*Carousel section*/}
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.olx.com.pk/thumbnails/437508562-800x600.webp"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.olx.com.pk/thumbnails/437508562-800x600.webp"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/*Carousel END*/}
      </div>
      <div className="container">
        <section className="categories">
          <h5>All Categories</h5>
          <div className="categories-container">
            {categories.map((category, index) => (
              <div className="category-item" key={index}>
                <img
                  style={{cursor:"pointer"}}
                  src={category.image}
                  alt={category.caption}
                  className="category-image"
                  onClick={()=>{navigate(`/all/${category.url}`)}}
                />
                <p className="category-caption">{category.caption}</p>
              </div>
            ))}
          </div>
        </section>
        <AdsByCategory category="Bikes" />
        <AdsByCategory category="Mobile" />
      </div>
    </main>
  );
}
