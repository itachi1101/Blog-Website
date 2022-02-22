import { Button, Card, Form } from "react-bootstrap";
import { useContext, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { useHistory } from "react-router-dom";
export default function Login() {
  const userEmail = useRef();
  const userPassword = useRef();
  const history = useHistory();
  const { user, dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/login/", {
        email: userEmail.current.value,
        password: userPassword.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      history.push("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      alert("INVALID CERDENTIALS");
    }
  };

  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        width: "80vw",
        marginTop: "100px",
      }}
    >
      <Card.Header as="h3" style={{ width: "100%" }}>
        LOGIN
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              ref={userEmail}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={userPassword}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isFetching}>
            Login
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer style={{ backgroundColor: "white", padding: "20px" }}>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          Create new account
        </Link>
      </Card.Footer>
    </Card>
  );
}
