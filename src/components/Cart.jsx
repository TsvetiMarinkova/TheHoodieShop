import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import { Card, Button, ListGroup, Dropdown, Modal } from "react-bootstrap";
import InfoModal from "./InfoModal";
import infoicon from "../images/infoicon.png";

//setting up the cart component
const Cart = () => {
  //ensuring i can access and update the redux state
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  //getting the current subtotal without the shipping so I can display it as the bottom of the page
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0),
    0
  );

  //setting up all the state for the shipping and the modals
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState("Select Shipping");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showWarningText, setShowWarningText] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  //handling opening and closing the successful purchase modal
  const handleClose = () => setShowPurchaseModal(false);
  const handleShow = () => {
    if (shippingCost === 0) {
      setShowWarningText(true);
    } else {
      setShowWarningText(false);
      setShowPurchaseModal(true);
    }
  };

  //an object array with all the shipping options
  const shippingOptions = [
    { name: "Standard (3-5 days)", cost: 3.99 },
    { name: "Express (1-2 days)", cost: 7.99 },
    { name: "Next Day Delivery", cost: 12.99 },
  ];

  //handling the selection of shipping
  const handleShippingSelect = (option) => {
    setShippingCost(option.cost);
    setSelectedShipping(`${option.name} (£${option.cost.toFixed(2)})`);
    setShowWarningText(false);
  };

  //handling the removal of an item from a cart
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="container vh-100 pt-4 pb-5 text-center">
      <h2>Your Cart</h2>
      {/* checking if there has been anything added to cart befor edisplaying the contents */}
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <>
          {/* using bootstrap for the styling and mapping out all the items in the cart state */}
          {/* displaying the items in Cards inside a Listo group for attractive styling */}
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
                {/* button for removing an item from the cart */}
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
            {/* using the array from earlier and mapping it into a dropdown with the shipping options */}
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
              {/* The button for the info modal linking to the info modal component*/}
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

            {/* showing warning text if the user tried to checkout without selection a shipping option */}
            {showWarningText && (
              <p className="text-danger mt-2">
                Please select a shipping option before proceeding.
              </p>
            )}
          </div>
          {/* Showing the subtotal, shipping cost and total */}
          <h4 className="fw-bold" style={{ color: "#606C38" }}>
            Subtotal: £{subtotal.toFixed(2)}
          </h4>
          <h5 className="fw-bold" style={{ color: "#606C38" }}>
            Shipping: £{shippingCost.toFixed(2)}
          </h5>
          <h3 className="fw-bold" style={{ color: "#283618" }}>
            Total: £{(subtotal + shippingCost).toFixed(2)}
          </h3>
          {/* checkout button that currently triggers a modal that alerts of a successful purchase */}
          <Button
            size="lg"
            className="mt-3"
            style={{ backgroundColor: "#BC6C25", borderColor: "#BC6C25" }}
            onClick={handleShow}
          >
            Proceed to Checkout
          </Button>

          {/* the successful purchase modal */}
          <Modal show={showPurchaseModal} onHide={handleClose}>
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
        // if no items are in the cart, it will show this message
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
