import React, { useState, useEffect } from "react";
import { Slider, Checkbox, Spin, Collapse, Select } from "antd";
import { firestore } from "config/firebase";
import { FilterOutlined, EyeOutlined } from "@ant-design/icons";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";

const { Panel } = Collapse;

const Menu = () => {
  const { category } = useParams(); // Get category from URL params
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);

  const categories = [
    "Mobile",
    "Vehicle",
    "Property for Sale",
    "Property for Rent",
    "Electronics and Home Appliances",
    "Bikes",
    "Business, Agricultural and Industrial",
    "Services",
    "Jobs",
    "Animals",
    "Furniture and Home Decor",
    "Fashion and Beauty",
    "Books, Sports and Hobbies",
    "Children",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(firestore, "items");
        const productsQuery = query(
          productsRef,
          where("category", "==", category)
        ); // Filter products by category

        const querySnapshot = await getDocs(productsQuery);
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Add category to dependencies

  useEffect(() => {
    const filtered = products.filter((product) => {
      const withinPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const inSelectedCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      return withinPriceRange && inSelectedCategory;
    });
    setFilteredProducts(filtered);
  }, [priceRange, selectedCategories, products]);

  console.log(filteredProducts);
  const onPriceChange = (value) => {
    setPriceRange(value);
  };

  const onCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
  };

  const navigate = useNavigate();

  const preview = (product) => {
    navigate(`/product/${product.id}`);
  };

  const updateWishlist = (product, isAdding) => {
    setWishlistItems((prevItems) => {
      let updatedItems;
      if (isAdding) {
        window.toastify(`${product.itemName} added to wishlist`, "info");
        updatedItems = [...prevItems, product];
      } else {
        window.toastify(`${product.itemName} removed from wishlist`, "info");
        updatedItems = prevItems.filter((item) => item.id !== product.id);
      }

      // Save the updated wishlist to local storage
      localStorage.setItem("wishlist", JSON.stringify(updatedItems));

      return updatedItems;
    });
  };

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  const handleChange = (e, product) => {
    const isChecked = e.target.checked;
    updateWishlist(product, isChecked);
  };

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div className="menu-container container">
      <div className="row">
        {/* Filter Section */}
        <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
          <div className="filter-section">
            <div className="mb-5 d-flex justify-content-between fw-bold">
              <div>Filters</div>
              <div>
                <FilterOutlined />
              </div>
            </div>
            <Collapse>
              <Panel header="Sort by">
                {/* Price Range Filter */}
                <div className="filter-item">
                  <h5 style={{ color: "#002f34" }}>Price Range</h5>
                  <Slider
                    range
                    style={{ color: "#000", border: "none", boxShadow: "none" }}
                    value={priceRange}
                    max={100000}
                    step={50}
                    onChange={onPriceChange}
                    tooltip={{ visible: true }}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <span>
                      Price: RS{priceRange[0]} - RS{priceRange[1]}
                    </span>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="filter-item">
                  <h4 style={{ color: "#002f34" }}>Categories</h4>
                  <Checkbox.Group onChange={onCategoryChange}>
                    {categories.map((cat) => (
                      <Checkbox key={cat} value={cat}>
                        {cat}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>

        {/* Product Display Section */}
        <div className="col-lg-9 col-md-8 col-sm-12">
          <div className="pg-header d-flex justify-content-between">
            <div>
              <Link to="/" className="text-decoration-none text-secondary">
                Home &nbsp;
              </Link>
              &gt; &nbsp;
              <Link to="/products" className="text-decoration-none text-black">
                {category}
              </Link>
            </div>
            <div>
              sort by newest &nbsp;
              <Select style={{ width: 120 }}>
                <Select.Option value="24hrs">Last 24 hrs</Select.Option>
                <Select.Option value="week">Last week</Select.Option>
                <Select.Option value="30days">In 30 days</Select.Option>
              </Select>
            </div>
          </div>
          <div id="card-container">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div id="card" key={product.id}>
                  <div className="card-img">
                    <img
                      onClick={() => {
                        preview(product);
                      }}
                      src={product.mainImageUrl}
                      alt={product.itemName}
                      effect="blur"
                    ></img>
                  </div>
                  <div className="card-info">
                    <p className="text-title" style={{ width: "150px" }}>
                      {product.itemName}
                    </p>
                  </div>
                  <div className="card-footer">
                    <span className="text-title">RS{product.price}</span>
                    <EyeOutlined
                      id="eye"
                      onClick={() => {
                        preview(product);
                      }}
                    />
                    <div className="heart-container" title="Like">
                      <input
                        checked={wishlistItems.some(
                          (item) => item.id === product.id
                        )}
                        onChange={(e) => handleChange(e, product)}
                        type="checkbox"
                        className="checkbox"
                        id="Give-It-An-Id"
                      />
                      <div className="svg-container">
                        <svg
                          viewBox="0 0 24 24"
                          className="svg-outline"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                        </svg>
                        <svg
                          viewBox="0 0 24 24"
                          className="svg-filled"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                        <svg
                          className="svg-celebrate"
                          width="100"
                          height="100"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon points="10,10 20,20"></polygon>
                          <polygon points="10,50 20,50"></polygon>
                          <polygon points="20,80 30,70"></polygon>
                          <polygon points="90,10 80,20"></polygon>
                          <polygon points="90,50 80,50"></polygon>
                          <polygon points="80,80 70,70"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex align-items-center flex-column w-100">
                <img src="https://www.olx.com.pk/assets/emptyOrders.2224131a3d84b6235c8dde8746ae03f5.webp" alt="no" />
                <p>There is nothing to show</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
