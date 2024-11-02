import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShareAltOutlined } from "@ant-design/icons";
import { useAuthContext } from "contexts/AuthContext";
import { message, Spin } from "antd";
export default function Profile() {
  const { uid } = useParams();

  const { user } = useAuthContext();

  const [loadingUser, setLoadingUser] = useState(true);
  const [userData, setUserData] = useState({});
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  function copyCurrentUrl() {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        window.toastify("URL copied to clipboard!");
      })
      .catch((error) => {
        window.toastify("Failed to copy URL: ", error);
      });
  }

  //get user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        setLoadingUser(true);
        try {
          const data = await window.getUserData(user.uid);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          message.error("Failed to load user data.");
        } finally {
          setLoadingUser(false);
        }
      }
    };
    fetchUserData();
  }, [user?.uid]);

  //get countries


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames.sort());
      } catch (error) {
        console.error("Error fetching country data:", error);
        message.error("Failed to load countries.");
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="container px-5 mb-5">
      <div className="row">
        <div className="col-lg-3 col-sm-12 px-4 d-flex flex-column  align-items-center">
          <div className="img-container">
            <img
              src={userData.profilePicUrl || "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"}
              alt="profile_img"
              height={200}
            />
          </div>
          <p
            style={{
              color: "#002f34",
              borderBottom: "2px solid #002f34",
              cursor: "pointer",
              fontWeight: "bold",
              padding: "3px 0px",
            }}
          >
            {" "}
            0 published ads
          </p>
          <div
            className="auth-box px-3 py-2 rounded rounded-1"
            onClick={copyCurrentUrl}
          >
            {" "}
            <ShareAltOutlined /> Share user profile
          </div>
        </div>
        <div className="col-lg-9 col-sm-12">
          <h2 className="mb-4" style={{ color: "#002f34" }}>
            {loadingUser ? (
              <Spin />
            ) : (
              userData.fullName || user.displayName || "User"
            )}
          </h2>
          <hr/>
          <h6 className="fw-bold my-3" style={{ color: "#002f34" }}>Filter By:</h6>
          <p className="mb-0 pb-0">Location</p>
          <select
              className="city-selector"
              defaultValue="Select Country"
              style={{ width: "300px" }}
            >
              <option disabled value="Select Country">
                Select Country
              </option>
              {loadingCountries ? (
                <option>Loading...</option>
              ) : (
                countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))
              )}
            </select>
          <p className="mt-4">Showing 0 out of 0 ads</p>
          <div className="d-flex w-100 align-items-center justify-content-center mt-5"><img src="https://www.olx.com.pk/assets/iconNotFound.3acd1674283d45836f4902bb010ff434.webp" alt="no"/></div>
          <p className="fw-bold m-0 p-0 text-center">There are no ads</p>
          <p className="m-0 p-0 text-center">When users post ads, they will appear here</p>
        </div>
      </div>
    </div>
  );
}
