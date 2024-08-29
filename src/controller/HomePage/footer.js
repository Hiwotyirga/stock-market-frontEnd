import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 Stock Market Website</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
