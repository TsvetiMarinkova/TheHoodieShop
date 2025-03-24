import React from "react";
import { Container, Button } from "react-bootstrap";
import heropic from "../images/heropic.jpg";
import homepic from "../images/homepic.jpg";

function Home() {
  return (
    <div>
      <Container
        className="mt-4 position-relative text-center text-white d-flex align-items-center justify-content-center"
        style={{
          height: "80vh",
          backgroundImage: `url(${heropic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        <div className="position-relative z-1">
          <h1 className="display-4 fw-bold" style={{ color: "#FEFAE0" }}>
            Effortless Streetwear
          </h1>
          <p className="lead" style={{ color: "#FEFAE0" }}>
            Inspired by London. Designed for the streets.
          </p>
          <a
            href="/shop"
            className="btn btn-light btn-lg"
            style={{ backgroundColor: "#FEFAE0" }}
          >
            Shop Now
          </a>
        </div>
      </Container>
      <Container className="py-5 container text-center">
        <h2 className="fw-bold mb-3">About Us</h2>
        <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
          We believe in effortless streetwear that blends comfort with style.
          Inspired by the streets of London, our collection is designed for
          those who appreciate minimal aesthetics with a modern edge.
        </p>
      </Container>
      <Container
        className="mt-4 position-relative text-center text-white d-flex align-items-center justify-content-center"
        style={{
          height: "80vh",
          backgroundImage: `url(${homepic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <div className="position-relative z-1 px-4"> */}
        <div
          className="p-4 rounded"
          style={{
            backgroundColor: "#283618",
            color: "#FEFAE0",
            maxWidth: "600px",
          }}
        >
          <h3 className="fw-bold mb-3">Discover Our Collection</h3>
          <p className="lead">
            Explore our latest drops and timeless essentials.
          </p>
          <Button
            href="/products"
            className="mt-3"
            style={{
              color: "#FEFAE0",
              backgroundColor: "#BC6C25",
              border: "#BC6C25",
            }}
          >
            View Products
          </Button>
        </div>
      </Container>
      <footer
        className="bg-dark text-center py-4 mt-5"
        style={{ color: "#DDA15E" }}
      >
        <p className="mb-2">&copy; 2025 HoodieShop Co. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
