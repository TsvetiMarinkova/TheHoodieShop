import React from "react";
import { useState } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setTotal } from "../store/cartSlice";
//import { useTotalPrice } from "./totalPriceContext"; //REPLACE WITH REDUX!!!

//importing all the product images
import aquarium1 from "../images/aquarium1.png";
import birds1 from "../images/birds1.png";
import cherry1 from "../images/cherry1.png";
import fuji1 from "../images/fuji1.png";
import graffiti1 from "../images/graffiti1.png";
import grow1 from "../images/grow1.png";
import joy1 from "../images/joy1.png";
import keepon1 from "../images/keepon1.png";
import nowhere1 from "../images/nowhere1.png";
import squiggle1 from "../images/squiggle1.png";
import ventures1 from "../images/ventures1.png";
import wonder1 from "../images/wonder1.png";
import aquarium2 from "../images/aquarium2.png";
import birds2 from "../images/birds2.png";
import cherry2 from "../images/cherry2.png";
import fuji2 from "../images/fuji2.png";
import graffiti2 from "../images/graffiti2.png";
import grow2 from "../images/grow2.png";
import joy2 from "../images/joy2.png";
import keepon2 from "../images/keepon2.png";
import nowhere2 from "../images/nowhere2.png";
import squiggle2 from "../images/squiggle2.png";
import ventures2 from "../images/ventures2.png";
import wonder2 from "../images/wonder2.png";

//object array with all the products and the relevant information for all of them
const productData = [
  {
    id: 1,
    title: "Aquarium hoodie",
    description: "Oversized hoodie with photographic back print in charcoal",
    price: 28.0,
    image1: aquarium1,
    image2: aquarium2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    title: "Birds hoodie",
    description: "Boxy oversized hoodie with back print in brown",
    price: 28.0,
    image1: birds1,
    image2: birds2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 3,
    title: "Cherry hoodie",
    description: "Cherry on point back printed hoodie in white",
    price: 32.99,
    image1: cherry1,
    image2: cherry2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 4,
    title: "Fuji hoodie",
    description: "oversized hoodie with sanctuary back print in black",
    price: 35.0,
    image1: fuji1,
    image2: fuji2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 5,
    title: "Graffiti hoodie",
    description:
      "oversized hoodie with graffiti chest and back print in grey marl",
    price: 28.0,
    image1: graffiti1,
    image2: graffiti2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 6,
    title: "Grow hoodie",
    description: "oversized hoodie with chest and back print in black",
    price: 30.0,
    image1: grow1,
    image2: grow2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 7,
    title: "Joy hoodie",
    description: "oversized hoodie with back print in grey marl",
    price: 30.0,
    image1: joy1,
    image2: joy2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 8,
    title: "Keep On hoodie",
    description: "Oversized hoodie with back print in black",
    price: 25.0,
    image1: keepon1,
    image2: keepon2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 9,
    title: "Nowhere hoodie",
    description: "Oversized hoodie with bubble print in grey marl",
    price: 28.0,
    image1: nowhere1,
    image2: nowhere2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 10,
    title: "Squiggle hoodie",
    description:
      "Boxy oversized hoodie with seam details and prints in grey marl",
    price: 32.0,
    image1: squiggle1,
    image2: squiggle2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 11,
    title: "Ventures hoodie",
    description: "Oversized hoodie with bubble print in white",
    price: 28.0,
    image1: ventures1,
    image2: ventures2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 12,
    title: "Wonder hoodie",
    description: "Boxy oversized hoodie with puff print in washed indigo",
    price: 30.0,
    image1: wonder1,
    image2: wonder2,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

function Products() {
  const dispatch = useDispatch();
  //accessing the context to update the total price
  //const { addToTotal } = useTotalPrice();
  //state for tracking the selected colours
  const [selectedSize, setSelectedSize] = useState({});

  //adding the product price to the total when the buy button is pressed
  //   function handleBuy(price) {
  //     addToTotal(price); //CHANGE TO ADD TO CART!!!!!!!!!!!!!
  //   }

  //setting the colour selection into state using the product id
  function handleSizeSelect(productId, sizes) {
    setSelectedSize((prev) => ({
      ...prev,
      [productId]: sizes,
    }));
  }

  return (
    <div className="text-center">
      <div className="row">
        {/*using the map function to create the product cards using the object array like required */}
        {productData.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <Card className="w-100 h-100 mt-3 d-flex flex-column justify-content-between">
              <Card.Img
                variant="top"
                src={product.image1}
                alt={product.title}
                className="img-fluid"
                onMouseOver={(e) => (e.currentTarget.src = product.image2)}
                onMouseOut={(e) => (e.currentTarget.src = product.image1)}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                {/*using toFixed to keep the prices to two decimals */}
                <Card.Text>£{product.price.toFixed(2)}</Card.Text>

                {/*dropdown for size selection */}
                <Dropdown
                  onSelect={(sizes) => handleSizeSelect(product.id, sizes)} //calling the function to set the size into state
                >
                  <Dropdown.Toggle style={{ backgroundColor: "#BC6C25" }}>
                    {selectedSize[product.id] || "Select Size"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {/*using map again to add all the colour options for each product */}
                    {product.sizes.map((sizes) => (
                      <Dropdown.Item key={sizes} eventKey={sizes}>
                        {sizes}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <Button
                  className="mt-3"
                  style={{ backgroundColor: "#283618" }}
                  //disabling the button if the user hasn't selected a size
                  disabled={!selectedSize[product.id]}
                  //calling handleBuy when buy button is clicked
                  onClick={() => {
                    dispatch(setTotal(product.price));
                    dispatch(addToCart(product));
                  }}
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
