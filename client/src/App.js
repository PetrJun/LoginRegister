import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { Dashboard } from "./pages/Dashboard";
import { UserProvider } from "./providers/UserProvider";
import { Header } from "./components/Header";
import { AdminDashboard } from "./pages/AdminDashboard";

function App() {
    return (
        <UserProvider>
            <Router>
                <Container
                    fluid
                    className="d-flex flex-column justify-content-center py-5"
                >
                    <Header />

                    <Row className="justify-content-center">
                        <Col xs={12} md={6}>
                            <Routes>
                                <Route path="/login" element={<LoginForm />} />
                                <Route
                                    path="/register"
                                    element={<RegisterForm />}
                                />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="/admin-dashboard"
                                    element={<AdminDashboard />}
                                />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </Router>
        </UserProvider>
    );
}

export default App;
