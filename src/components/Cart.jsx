import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import { Card, Button, ListGroup, Dropdown, Modal } from "react-bootstrap";
import InfoModal from "./InfoModal";
import infoicon from "../images/infoicon.png";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0),
    0
  );

  const [shippingCost, setShippingCost] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState("Select Shipping");
  const [showModal, setShowModal] = useState(false);
  const [showWarningText, setShowWarningText] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    if (shippingCost === 0) {
      setShowWarningText(true);
    } else {
      setShowWarningText(false);
      setShowModal(true);
    }
  };

  const shippingOptions = [
    { name: "Standard (3-5 days)", cost: 3.99 },
    { name: "Express (1-2 days)", cost: 7.99 },
    { name: "Next Day Delivery", cost: 12.99 },
  ];

  const handleShippingSelect = (option) => {
    setShippingCost(option.cost);
    setSelectedShipping(`${option.name} (£${option.cost.toFixed(2)})`);
    setShowWarningText(false);
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="container vh-100 pt-4 pb-5 text-center">
      <h2>Your Cart</h2>
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <>
          <ListGroup className="mb-3">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <Card.Img
                    src={item.image1}
                    alt={item.title}
                    style={{ width: "80px", marginRight: "10px" }}
                  />
                  {item.title} - £{item.price?.toFixed(2)}
                </div>
                <Button
                  style={{ backgroundColor: "#BC6C25" }}
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mb-3">
            <Dropdown>
              <Dropdown.Toggle
                style={{ backgroundColor: "#DDA15E", borderColor: "#DDA15E" }}
              >
                {selectedShipping}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {shippingOptions.map((option, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleShippingSelect(option)}
                  >
                    {option.name} - £{option.cost.toFixed(2)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
              <Button
                variant="primary-border"
                style={{
                  width: "5%",
                  height: "5%",
                }}
                //setting the modal state as clicked
                onClick={() => setShowInfoModal(true)}
              >
                <img src={infoicon} style={{ width: "100%", height: "auto" }} />
              </Button>
              {/*adding the actual modual pop up in here  */}
              <InfoModal
                show={showInfoModal}
                onHide={() => setShowInfoModal(false)}
              />
            </Dropdown>

            {showWarningText && (
              <p className="text-danger mt-2">
                Please select a shipping option before proceeding.
              </p>
            )}
          </div>
          <h4 className="fw-bold" style={{ color: "#606C38" }}>
            Subtotal: £{subtotal.toFixed(2)}
          </h4>
          <h5 className="fw-bold" style={{ color: "#606C38" }}>
            Shipping: £{shippingCost.toFixed(2)}
          </h5>
          <h3 className="fw-bold" style={{ color: "#283618" }}>
            Total: £{(subtotal + shippingCost).toFixed(2)}
          </h3>
          <Button
            size="lg"
            className="mt-3"
            style={{ backgroundColor: "#BC6C25", borderColor: "#BC6C25" }}
            onClick={handleShow}
          >
            Proceed to Checkout
          </Button>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Congratulations!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your purchase is complete and you order is on it's way!
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleClose}
                style={{ backgroundColor: "#BC6C25", borderColor: "#BC6C25" }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
