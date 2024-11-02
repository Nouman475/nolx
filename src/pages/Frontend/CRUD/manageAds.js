import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Input, Row, Col, message, Spin, Switch } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "config/firebase";
import "./style.css";
const { Meta } = Card;

const ManageAds = () => {
  const [ads, setAds] = useState([]);
  const [editingAd, setEditingAd] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loadingAds, setLoadingAds] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const db = getFirestore();

  useEffect(() => {
    const fetchAds = async () => {
      const adsCollection = collection(db, "items");
      const adsSnapshot = await getDocs(adsCollection);
      const adsList = adsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAds(adsList);
      setLoadingAds(false);
    };

    fetchAds();
  }, [db]);

  const handleEditClick = (ad) => {
    setEditingAd(ad);
    setUpdatedData(ad);
    setIsModalVisible(true);
  };

  const handleDeleteClick = async (adId) => {
    try {
      await deleteDoc(doc(firestore, "items", adId));
      setAds(ads.filter((ad) => ad.id !== adId));
      message.success("Ad deleted successfully");
    } catch (error) {
      message.error("Failed to delete ad");
      console.error("Error deleting ad:", error);
    }
  };

  const handleModalOk = async () => {
    try {
      const adRef = doc(firestore, "items", editingAd.id);
      await updateDoc(adRef, updatedData);
      setAds(ads.map((ad) => (ad.id === editingAd.id ? updatedData : ad)));
      message.success("Ad updated successfully");
    } catch (error) {
      message.error("Failed to update ad");
      console.error("Error updating ad:", error);
    }
    setIsModalVisible(false);
    setEditingAd(null);
  };
  

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingAd(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.itemName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || ad.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loadingAds) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Spin />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" ,minHeight:"80vh" }} className="container">
      <h5>Manage and view your Ads</h5>

      <div style={{ marginBottom: "20px" }}>
        <Input
          placeholder="Search Ads"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: "10px", width: "300px" }}
        />
        <div>
          {["all", "active", "inactive", "pending", "moderated"].map(
            (status) => (
              <Button
                key={status}
                type={filterStatus === status ? "primary" : "default"}
                onClick={() => setFilterStatus(status)}
                style={{ marginRight: "5px" }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} Ads
              </Button>
            )
          )}
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {filteredAds.map((ad) => (
          <Col xs={24} sm={12} md={8} lg={6} key={ad.id}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src={ad.mainImageUrl || "https://via.placeholder.com/300"}
                  style={{ height: "150px", objectFit: "cover" }}
                />
              }
              actions={[
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEditClick(ad)}
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDeleteClick(ad.id)}
                >
                  Delete
                </Button>,
              ]}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Meta
                title={<strong>{ad.itemName}</strong>}
                description={
                  <div>
                    <div>
                      <span
                        className={`dot ${
                          ad.status === "active" ? "active" : "inactive"
                        }`}
                      ></span>
                      <span>
                        {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}{" "}
                        Ad
                      </span>
                    </div>
                    <p>Category: {ad.category}</p>
                    <p>Price: ${ad.price}</p>
                    <div
                      style={{
                        maxHeight: expanded ? "none" : "50px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {ad.description}
                    </div>
                    {!expanded && ad.description.length > 100 && (
                      <Button type="link" onClick={() => setExpanded(true)}>
                        See More
                      </Button>
                    )}
                    {expanded && (
                      <Button type="link" onClick={() => setExpanded(false)}>
                        See Less
                      </Button>
                    )}
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Edit Ad"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Update"
        cancelText="Cancel"
      >
        <Input
          name="itemName"
          placeholder="Item Name"
          value={updatedData.itemName}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <Input
          name="price"
          placeholder="Price"
          value={updatedData.price}
          onChange={handleInputChange}
          type="number"
          style={{ marginBottom: "10px" }}
        />
        <Input
          name="description"
          placeholder="Description"
          value={updatedData.description}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <div style={{ marginBottom: "10px" }}>
          <span>
            Status: {updatedData.status === "active" ? "Active" : "Inactive"}
          </span>
          <Switch
            checked={updatedData.status === "active"}
            onChange={(checked) =>
              setUpdatedData({
                ...updatedData,
                status: checked ? "active" : "inactive",
              })
            }
            style={{ marginLeft: "10px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ManageAds;
