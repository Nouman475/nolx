 import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const { Meta } = Card;

const AdsByCategory = ({ category }) => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAdsByCategory = async () => {
      const db = getFirestore();
      const adsCollection = collection(db, "items");
      const q = query(adsCollection, where("category", "==", category));
      const adsSnapshot = await getDocs(q);
      const adsList = adsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAds(adsList);
    };

    fetchAdsByCategory();
  }, [category]);

  return (
    <div style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between my-3">
      <h5>Ads in {category}</h5>
      <Button className="fs-6 fw-bold" type="link" onClick={()=>{navigate(`/all/${category}`)}} >view more &nbsp; &gt;</Button>
      </div>
      <Row gutter={[16, 16]}>
        {ads.map((ad) => (
          <Col xs={24} sm={12} md={8} lg={6} key={ad.id}>
            <Card
              hoverable
              cover={
                  <img
                  onClick={()=>{navigate(`/product/${ad.productId}`)}}
                  alt="example"
                  src={ad.mainImageUrl || "https://via.placeholder.com/300"}
                  style={{ height: "150px", objectFit: "cover" }}
                />
              }
              style={{
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }} className="mb-2">
                <Typography.Text strong style={{ fontSize: "16px" }}>
                  RS {ad.price}
                </Typography.Text>
                <HeartOutlined onClick={()=>{navigate(`/product/${ad.productId}`)}} style={{color:"#002f34;"}} /> 
              </div>
              <Meta
                title={<strong>{ad.itemName}</strong>}
                description={
                  <div>
                    <p style={{ margin: "0", fontSize: "14px", height: "40px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {ad.description}
                    </p>
                    <Button type="link" style={{ fontSize: "12px", padding: "0" }}>
                      See More
                    </Button>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdsByCategory;
