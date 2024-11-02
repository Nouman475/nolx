import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Input, Button, message, Dropdown, Menu, Spin } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BellOutlined,
  MessageOutlined,
  AppstoreAddOutlined,
  DollarOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  EyeOutlined,
  HeartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "contexts/AuthContext";
import logo from "../../Assets/logo.png";
import AuthController from "../../pages/Auth/authController"; // Adjust the import path as needed
import Sidebar from "components/sidebar/sidebar";

export default function Header() {
  const { isAuthenticated, user } = useAuthContext();
  const authController = AuthController();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalView, setModalView] = useState("default");
  const [userData, setUserData] = useState({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [authError, setAuthError] = useState("");
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const navigate = useNavigate();
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
  const showModal = () => {
    setIsModalVisible(true);
    setModalView("default");
    resetForm();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalView("default");
  };

  const openEmailLogin = () => setModalView("emailLogin");
  const openPhoneLogin = () => setModalView("phoneLogin");
  const openSignup = () => setModalView("signup");

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setAuthError("");
  };

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

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }
    try {
      await authController.register(fullName, email, password);
      setIsModalVisible(false);
      message.success("Account created successfully!");
    } catch (error) {
      setAuthError("Registration failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      await authController.login(email, password);
      setIsModalVisible(false);
      message.success("Logged in successfully!");
    } catch (error) {
      setAuthError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authController.loginWithGoogle();
      setIsModalVisible(false);
      message.success("Logged in with Google!");
    } catch (error) {
      setAuthError("Google login failed. Please try again.");
    }
  };

  const handleSellClick = () => {
    if (!isAuthenticated) {
      showModal();
    } else {
      navigate("/createAd");
    }
  };

  const handleLogout = async () => {
    try {
      await authController.logout();
      message.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      message.error("Logout failed. Please try again.");
    }
  };

  const userMenu = (
    <Menu>
      <span id="hello">Hello,</span>
      <div className="d-flex gap-2 px-1 py-2">
        <img
          src={
            userData.profilePicUrl ||
            "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
          }
          alt="avatar"
          style={{ borderRadius: "50%" }}
          height={70}
          width={70}
        />
        {isAuthenticated && (
          <h5 className="mt-4">
            {loadingUser ? (
              <Spin />
            ) : (
              userData.fullName || user.displayName || "User"
            )}
          </h5>
        )}
      </div>
      <div className="px-3">
        <div
          className="my-3 auth-box rounded rounded-1"
          onClick={() => {
            navigate("/editProfile/info");
          }}
        >
          View and edit your profile
        </div>
      </div>
      <hr />
      <div className="list-style-type-none">
        <div
          onClick={() => {
            navigate("/manageAds");
          }}
        >
          <AppstoreAddOutlined />
          &ensp; My ads
        </div>
        <div>
          <HeartOutlined />
          &ensp; Favourites and saved searches
        </div>
        <div
          onClick={() => {
            navigate(`/profile/${user.uid}`);
          }}
        >
          <EyeOutlined />
          &ensp; Public profile
        </div>
        <div>
          <ShoppingCartOutlined />
          &ensp; Buy Discounted Packages
        </div>
        <div>
          <DollarOutlined />
          &ensp; Bought Packages and Billing
        </div>
        <hr />
        <div>
          <QuestionCircleOutlined />
          &ensp; Help
        </div>
        <div>
          <SettingOutlined />
          &ensp; Settings
        </div>
        <hr />
        <div onClick={handleLogout}>
          <LogoutOutlined />
          &ensp; Logout
        </div>
      </div>
    </Menu>
  );

  return (
    <header className="header container">
      <div className="w-100">
        <Button
          type="link"
          className="menu-toggle"
          icon={<MenuOutlined />}
          onClick={toggleSidebar}
        />
      </div>
      <div className="header-row d-flex">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="icons d-flex">
          <div id="bold">
            <span id="circle">
              <i className="fas fa-car" />
            </span>
            Motors
          </div>
          <div id="bold">
            <span id="circle">
              <i className="fas fa-building" />
            </span>
            Properties
          </div>
        </div>
      </div>

      <div className="container" id="second">
        <div className="header-row row d-flex align-items-center">
          <div className="col-3">
            <select
              className="city-selector"
              defaultValue="Select Country"
              style={{ width: "100%" }}
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
          </div>
          <div className="col-6 p-0">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Find Cars, Mobile phones and more..."
              />
              <button className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="col-2 p-0">
            <div
              className="auth-buttons d-flex align-items-center"
              style={{ marginLeft: "10px" }}
            >
              {isAuthenticated ? (
                <>
                  <Link to="/">
                    <BellOutlined id="icon" style={{ fontSize: 24 }} />
                  </Link>
                  <Link to="/">
                    <MessageOutlined id="icon2" style={{ fontSize: 24 }} />
                  </Link>
                  &nbsp;
                  <Dropdown overlay={userMenu} trigger={["click"]}>
                    <span className="d-flex">
                      <img
                        src={
                          userData.profilePicUrl ||
                          "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
                        }
                        alt="Avatar"
                        style={{
                          display: "inline-block",
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          marginRight: 8,
                        }}
                      />{" "}
                      ▼
                    </span>
                  </Dropdown>
                  <span className="sell-button" onClick={handleSellClick}>
                    <img
                      src="https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg"
                      alt="Sell"
                      className="sell-icon"
                    />
                    <span className="sell-text">+ Sell</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="login" onClick={showModal}>
                    Login
                  </span>
                  <span className="sell-button" onClick={handleSellClick}>
                    <img
                      src="https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg"
                      alt="Sell"
                      className="sell-icon"
                    />
                    <span className="sell-text">+ Sell</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {modalView === "default" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div className="d-flex justify-content-center my-3">
              <img src={logo} alt="logo" height={60} />
            </div>
            <h4 className="text-center fw-bold">Login to your OLX account</h4>
            <div className="auth-box" onClick={handleGoogleLogin}>
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google logo"
                height={40}
              />{" "}
              Login with Google
            </div>
            <div className="auth-box" onClick={openEmailLogin}>
              <MailOutlined style={{ fontSize: "24px", color: "#002f34" }} />{" "}
              Login with Email
            </div>
            <div className="auth-box" onClick={openPhoneLogin}>
              <PhoneOutlined style={{ fontSize: "24px", color: "#002f34" }} />{" "}
              Login with Phone
            </div>
            <div id="navigator" onClick={openSignup}>
              New to OLX? Create an account
            </div>
          </div>
        )}

        {modalView === "phoneLogin" && (
          <div>
            <h4 className="text-center fw-bold my-4">Login with Phone</h4>
            <label htmlFor="phone">Phone</label>
            <Input
              placeholder="Phone Number"
              prefix={<PhoneOutlined />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="password" className="mt-4">
              Password
            </label>
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="primary" block className="mt-2">
              Login
            </Button>
            <Button type="link" block onClick={() => setModalView("default")}>
              Back
            </Button>
          </div>
        )}

        {modalView === "emailLogin" && (
          <div>
            <h4 className="text-center fw-bold my-4">Login with Email</h4>
            <label htmlFor="email">Email</label>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="mt-4">
              Password
            </label>
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            {authError && <p style={{ color: "red" }}>{authError}</p>}
            <Button type="primary" block className="mt-2" onClick={handleLogin}>
              Login
            </Button>
            <Button type="link" block onClick={() => setModalView("default")}>
              Back
            </Button>
          </div>
        )}

        {modalView === "signup" && (
          <div>
            <h4 className="text-center fw-bold my-4">Create an OLX Account</h4>
            <Input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mb-4"
              prefix={<UserOutlined />}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<MailOutlined />}
            />
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-4"
            />
            <Input.Password
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="my-4"
            />
            {authError && <p style={{ color: "red" }}>{authError}</p>}
            <Button
              type="primary"
              block
              className="mt-2"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            <Button type="link" block onClick={() => setModalView("default")}>
              Back
            </Button>
          </div>
        )}
      </Modal>
      <Sidebar
        visible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        userMenu={userMenu}
      />
    </header>
  );
}
