import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useUser } from "../providers/UserProvider";

export function LoginForm() {
    const { login } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loggedinUser = await login(email, password);
            console.log("loggedinUser: ", loggedinUser);
            if (loggedinUser) {
                navigate("/dashboard");
            } else {
                // If login result doesn't contain a valid token
                setError("Nesprávné přihlašovací údaje");
            }
        } catch (err) {
            // If login fails, display error message
            setError("Nesprávné přihlašovací údaje");
        }
    };

    return (
        <Container className="mt-5 w-75">
            <Row className="justify-content-center border border-secondary shadow p-3 mb-5 bg-gray rounded">
                <Col md={12}>
                    <Form onSubmit={handleSubmit} className="p-3" md={6}>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Zadejte svůj email"
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Heslo</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Zadejte své heslo"
                            />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                        >
                            Přihlásit se
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
