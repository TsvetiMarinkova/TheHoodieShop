import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/userSlice";

function NavBar() {
  const { username, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // basic bootstrap navbar to display the different components of the site,
  // using the routes set on the home page
  return (
    <div>
      <Navbar
        data-bs-theme="dark"
        style={{ backgroundColor: "#283618", color: "#FEFAE0" }}
      >
        <Container>
          <Nav className=" vw-100">
            <Nav.Link href="/" className="p-3" style={{ color: "#FEFAE0" }}>
              Home
            </Nav.Link>
            <Nav.Link
              href="/products"
              className="p-3"
              style={{ color: "#FEFAE0" }}
            >
              Products
            </Nav.Link>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {/* here im displaying the cart button and the login and register buttons */}
                <Button
                  href="/cart"
                  className="pe-2"
                  style={{
                    backgroundColor: "#283618",
                    borderColor: "#283618",
                    color: "#FEFAE0",
                  }}
                >
                  Cart
                </Button>
                {isLoggedIn ? (
                  <>
                    <span>Hello, {username}!</span>
                    <Button
                      style={{
                        backgroundColor: "#283618",
                        borderColor: "#283618",
                        color: "#FEFAE0",
                      }}
                      onClick={() => dispatch(logOut())}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      href="/login"
                      className="ps-1"
                      style={{
                        backgroundColor: "#283618",
                        borderColor: "#283618",
                        color: "#FEFAE0",
                      }}
                    >
                      Log In
                    </Button>
                    <Button
                      href="/register"
                      className="ps-2"
                      style={{
                        backgroundColor: "#283618",
                        borderColor: "#283618",
                        color: "#FEFAE0",
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Navbar.Text>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
