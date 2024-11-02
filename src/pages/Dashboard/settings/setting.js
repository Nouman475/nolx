// Importing React and CSS
import React, { useEffect, useState } from "react";
import "./style.css";

// Importing Ant Design icon
import { InfoCircleOutlined } from "@ant-design/icons";
import { Input, message, Select, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAuthContext } from "contexts/AuthContext";

// Main Setting Component
export default function Setting() {
  const { user } = useAuthContext();
  const [loadingUser, setLoadingUser] = useState(true);
  const [userData, setUserData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Show modal on "Upload Photo" button click
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Get user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        setLoadingUser(true);
        try {
          const data = await window.getUserData(user.uid);
          setUserData(data);
          setOriginalData(data); // Save original data to handle discard
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePic(URL.createObjectURL(file)); // Preview the new profile picture
    setUserData((prevData) => ({ ...prevData, profilePic: file })); // Update in userData
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      await window.updateUserData(user.uid, userData); // Save the data
      message.success("Profile updated successfully.");
      setOriginalData(userData); // Update original data to match saved data
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile.");
    }
  };

  // Handle discard changes
  const handleDiscardChanges = () => {
    setUserData(originalData); // Revert to original data
    setNewProfilePic(null); // Remove new profile picture preview
  };

  return (
    <div className="container">
      {/* Main container with border */}
      <div className="c-border mb-5">
        <h4>Edit profile</h4>
        <hr />
        <div className="row">
          {/* Profile photo section */}
          <div className="col-lg-2 col-sm-12">
            <div className="fw-bold">Profile Photo</div>
            <img
              src={newProfilePic || userData.profilePicUrl || "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"}
              alt="profile-img"
              id="profile-pic"
              style={{height:"10rem",width:"10rem"}}
            />
          </div>
          {/* Upload photo and info section */}
          <div className="col-lg-9 col-sm-12 p-4 ms-lg-4">
            <button id="uploader" className="mt-5 mb-3" onClick={showModal}>
              Upload Photo
            </button>
            <p id="info">
              <InfoCircleOutlined style={{ fontSize: "12px" }} />
              &ensp;JPG, JPEG, PNG Min: 400px, Max: 1024px
            </p>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div className="fw-bold mb-2">Name</div>
            <Input
              className="py-2"
              type="text"
              name="fullName"
              value={userData.fullName || ""}
              placeholder="Name"
              onChange={handleInputChange}
            />
            <div className="fw-bold mt-3 mb-2">Date of Birth</div>
            <div className="row p-1">
              <div className="col px-1">
                <Input
                  placeholder="DD"
                  className="py-2"
                  type="number"
                  name="day"
                  value={userData.day || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col px-1">
                <Input
                  placeholder="MM"
                  className="py-2"
                  type="number"
                  name="month"
                  value={userData.month || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col px-1">
                <Input
                  placeholder="YYYY"
                  className="py-2"
                  type="number"
                  name="year"
                  value={userData.year || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="fw-bold my-3">Gender</div>
            <Select
              placeholder="Select Your Gender"
              className="w-100"
              value={userData.gender || ""}
              onChange={(value) => setUserData((prevData) => ({ ...prevData, gender: value }))}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Prefer not to say">Prefer not to say</Select.Option>
            </Select>
            <div className="fw-bold my-3">About</div>
            <TextArea
              placeholder="optional"
              className="mb-4"
              rows={5}
              name="about"
              value={userData.about || ""}
              onChange={handleInputChange}
            />
          </div>
          <hr />
          <div className="col-lg-6 col-sm-12">
            <div className="fw-bold my-3">Contact Information</div>
            <Input
              className="py-2"
              type="text"
              name="phone"
              value={userData.phone || ""}
              placeholder="Phone Number"
              onChange={handleInputChange}
            />
            <Input
              className="py-2 my-3"
              type="text"
              name="email"
              value={userData.email || ""}
              placeholder="Email"
              onChange={handleInputChange}
            />
          </div>
          <hr />
          <div className="col-lg-10 col-sm-12">
            <div className="fw-bold my-3">Optional Information</div>

            <div className="d-flex align-items-center justify-content-between mt-2">
              <div>
                <div>Facebook</div>
                <div id="small">
                  Sign in with Facebook and discover your trusted connections to
                  buyers
                </div>
              </div>
              <div className="auth-box  text-center w-5">Connect Facebook</div>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-2">
              <div>
                <div>Google</div>
                <div id="small">
                  Connect your OLX account to your Google account for simplicity
                  and ease
                </div>
              </div>
              <div className="auth-box text-center w-5">Connect Google</div>
            </div>
          </div>
          <hr className="my-3"/>
          <div className="col-12 d-flex justify-content-between">
            <div onClick={handleDiscardChanges} id="discard">
              Discard
            </div>
            <div type="primary" onClick={handleSaveChanges} id="uploader">
              Save Changes
            </div>
          </div>
        </div>
        <Modal
          title="Upload New Profile Picture"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
         <input type="file" id="uploader" onChange={handleProfilePicChange} className="mt-5 mb-3" />
        </Modal>
      </div>
    </div>
  );
}
