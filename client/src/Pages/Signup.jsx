import { Form, Button, Container, Card, Badge } from "react-bootstrap";
import { useRef, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Signup() {
  const [err, setError] = useState(false);
  const userEmail = useRef();
  const userPassword = useRef();
  const userRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username: userRef.current.value,
        email: userEmail.current.value,
        password: userPassword.current.value,
      });
      res.data && window.location.replace("http://localhost:3000/login/");
    } catch (err) {
      setError(true);
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
        SIGN UP
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control ref={userRef} placeholder="username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={userEmail}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={userPassword}
              type="password"
              placeholder="Password"
            />
            {err && (
              <Badge bg="danger" style={{ marginTop: "20px" }}>
                Something went wrong
              </Badge>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
