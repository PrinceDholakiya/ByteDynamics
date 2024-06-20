import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderPopup from './OrderPopup';
import CategoryComponent from './CategoryComponent';
import ItemComponent from './ItemComponent';
import AlertComponent from './AlertComponent'; // Import for alerts

const Dashboard = ({ categories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [formData, setFormData] = useState({
    code: "",
  });
  const [errors, setErrors] = useState({});
  const [cartItems] = useState([]);
  const [totalPrice] = useState(0);
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSecurityArmed] = useState(false); // State to track security system status
  const [alerts, setAlerts] = useState([]); // State to track security alerts

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("token is no more");
      sessionStorage.clear();
      navigate(-1);
    } else {
      console.log("token is " + localStorage.getItem("token"));
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (formData.code === "") {
      setErrors({ code: "Employee code is required" });
    } else {
      // Assuming successful login
      setIsLoggedIn(true);
      setErrors({});
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleItemSelect = (item) => {
    // Logic to handle item selection
  };

  const handleRemoveItem = (itemId) => {
    // Logic to handle item removal from cart
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    if (isSecurityArmed) {
      // Simulate fetching alerts
      setAlerts([
        { id: 1, message: "Door opened" },
        { id: 2, message: "Door closed" },
      ]);
    } else {
      setAlerts([]);
    }
  }, [isSecurityArmed]);

  return (
    <>
      <nav className="navDashboard">
        <div className="logo">BYTE DYNAMICS</div>
        <div className="navLinks">
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="code"
              placeholder="Employee Code"
              value={formData.code}
              onChange={handleChange}
            />
            {errors.code && <span className="error">{errors.code}</span>}
            <button type="submit" className="employeeLoginBtn">
              Employee Login
            </button>
          </form>
          <span />
          <button className="menuBtn1" onClick={() => setPopupOpen(true)}>
            View Order
          </button>
          <OrderPopup
            isOpen={isPopupOpen}
            onClose={() => setOrderPopupOpen(false)}
          />
          <button className="menuBtn1" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      {isLoggedIn && (
        <div className="dashboardContent">
          <div className="securitySystem">
            <button onClick={toggleSecuritySystem}>
              {isSecurityArmed ? "Disarm Security System" : "Arm Security System"}
            </button>
            <AlertComponent alerts={alerts} />
            <CameraFeed />
          </div>
          <div className="orderPanel">
            <div className="categoryContainer">
              <CategoryComponent
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </div>
            <div className="itemsComponent">
              <ItemComponent
                categoryId={selectedCategoryId}
                onItemSelect={handleItemSelect}
              />
            </div>
            <div className="cartComponent">
              <CartComponent
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
                onPlus={handlePlus}
                onMinus={handleMinus}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
