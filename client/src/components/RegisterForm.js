import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Row, Col, Container } from "react-bootstrap";
import { useUser } from "../providers/UserProvider";

export const RegisterForm = () => {
    const { register } = useUser();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const registredUser = await register(username, email, password);
            console.log("registredUser: ", registredUser);
            if (registredUser) {
                navigate("/dashboard");
            } else {
                setError("Chyba při registraci");
            }
        } catch (err) {
            setError("Chyba při registraci");
        }
    };

    return (
        <Container className="mt-5 w-75">
            <Row className="justify-content-center border border-secondary shadow p-3 mb-5 bg-gray rounded">
                <Col md={12}>
                    <Form onSubmit={handleSubmit} className="p-3">
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Uživatelské jméno</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Zadejte uživatelské jméno"
                            />
                        </Form.Group>

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
                            Registrovat se
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
