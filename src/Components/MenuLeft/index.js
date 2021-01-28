import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Logo from '../Logo';
import Clima from '../Clima';

function MenuLeft() {
  return (
    <Container id="menuLeft" fluid>
      <Row>
        <Col className="d-flex flex-column">
          <Logo />
          <Clima />
        </Col>
      </Row>
    </Container>
  );
}

export default MenuLeft;
