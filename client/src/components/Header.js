import { Row, Col, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

export const Header = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
        navigate('/login');
    };

    return (
        <Row className="justify-content-center">
            <Col xs={12} md={6}>
                <h2 className="text-center mb-4">Login/Register</h2>
                <Nav className="justify-content-center mb-4">
                    <Nav.Item>
                        <Nav.Link
                            as={Link}
                            to="/login"
                            className="text-primary"
                        >
                            Přihlášení
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            as={Link}
                            to="/register"
                            className="text-primary"
                        >
                            Registrace
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            as={Link}
                            to="/dashboard"
                            className="text-danger"
                        >
                            Dashboard
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            as={Link}
                            to="/admin-dashboard"
                            className="text-danger"
                        >
                            Admin Dashboard
                        </Nav.Link>
                    </Nav.Item>
                    <Button
                        variant="secondary"
                        onClick={handleLogout}
                    >
                        Odhlásit
                    </Button>
                </Nav>
            </Col>
        </Row>
    );
};
