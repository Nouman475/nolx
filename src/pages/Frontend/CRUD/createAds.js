import React, { useState } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
  Upload,
  Progress,
  Select,
  message,
} from "antd";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "config/firebase";

const { Option } = Select;

const AddForm = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    description: "",
    category: "",
    productId: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
  });
  const [fileListMain, setFileListMain] = useState([]);
  const [fileListSecondary, setFileListSecondary] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [secondaryImageUrls, setSecondaryImageUrls] = useState([]);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const auth = getAuth();
  const storage = getStorage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleMainImageUpload = async ({ fileList: newFileList }) => {
    setFileListMain(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      await uploadImage(file, true);
    }
  };

  const handleSecondaryImagesUpload = async ({ fileList: newFileList }) => {
    setFileListSecondary(newFileList);
    const urls = [];
    setUploading(true);
    const totalImages = newFileList.length;
    let uploadedCount = 0;

    for (const fileObj of newFileList) {
      const file = fileObj.originFileObj;
      const url = await uploadImage(file, false);
      urls.push(url);
      uploadedCount += 1;
      setUploadingProgress(Math.round(((uploadedCount + 1) / (totalImages + 1)) * 100));
    }

    setSecondaryImageUrls(urls);
    setUploading(false);
    setUploadingProgress(0);
  };

  const uploadImage = async (file, isMainImage) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadingProgress(progress);
        },
        (error) => {
          message.error("Error uploading file: " + error.message);
          setUploading(false);
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          if (isMainImage) {
            setMainImageUrl(url);
          }
          resolve(url);
        }
      );
    });
  };

  const handleAddItem = async () => {
    if (!auth.currentUser) {
      message.error("No user is signed in");
      return;
    }

    if (
      !mainImageUrl ||
      !formData.category ||
      !formData.itemName ||
      !formData.price ||
      secondaryImageUrls.length < 2
    ) {
      message.error("Please fill in all fields and upload all images");
      return;
    }

    const uid = auth.currentUser.uid;
    const productRef = doc(firestore, "items", formData.productId);

    try {
      await setDoc(productRef, {
        ...formData,
        mainImageUrl: mainImageUrl,
        secondaryImageUrls: secondaryImageUrls,
        createdBy: uid,
        status: "active",
      });
      message.success("Item added successfully");

      // Reset form
      setFileListMain([]);
      setFileListSecondary([]);
      setMainImageUrl("");
      setSecondaryImageUrls([]);
      setFormData({
        itemName: "",
        price: "",
        description: "",
        category: "",
        productId: Math.floor(
          1000000000 + Math.random() * 9000000000
        ).toString(),
      });
    } catch (error) {
      message.error("Error adding item: " + error.message);
      console.error("Error adding item:", error);
    }
  };

  const categories = [
    "Mobile",
    "Vehicle",
    "Property",
    "Property",
    "Electronics",
    "Bikes",
    "Business",
    "Services",
    "Jobs",
    "Animals",
    "Furniture",
    "Fashion",
    "Books",
    "Children",
  ];

  return (
    <Card
      style={{
        border: "none",
        width: "70%",
        margin: "20px auto",
      }}
    >
      <Typography.Title level={1}>List New Product</Typography.Title>
      <Input
        name="itemName"
        placeholder="Item Name"
        value={formData.itemName}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <Input
        name="price"
        placeholder="Price"
        type="number"
        value={formData.price}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <Input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <label htmlFor="category">Select Category</label>
      <Select
        placeholder="Select a category"
        value={formData.category}
        onChange={handleCategoryChange}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        {categories.map((category, i) => (
          <Option key={i} value={category}>
            {category}
          </Option>
        ))}
      </Select>

      <p>Upload Main Image</p>
      <Upload
        listType="picture-card"
        fileList={fileListMain}
        onChange={handleMainImageUpload}
        accept=".jpg, .jpeg, .png"
        beforeUpload={() => false}
      >
        {fileListMain.length < 1 && "+ Upload"}
      </Upload>

      <p>Upload 2 Secondary Images</p>
      <Upload
        listType="picture-card"
        fileList={fileListSecondary}
        onChange={handleSecondaryImagesUpload}
        accept=".jpg, .jpeg, .png"
        beforeUpload={() => false}
        multiple
      >
        {fileListSecondary.length < 2 && "+ Upload"}
      </Upload>

      {uploading && (
        <Progress percent={uploadingProgress} status="active" style={{ marginTop: '10px' }} />
      )}

      <Button
        type="primary"
        onClick={handleAddItem}
        style={{ width: "100%", margin: "10px 0px" }}
      >
        Add Item
      </Button>
    </Card>
  );
};

export default AddForm;
