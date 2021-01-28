import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Title from '../Title';
import TopMusicasItem from '../TopMusicasItem';

function TopMusicas({ title }) {
  return (
    <Container fluid className="my-3">
      <Row className="d-flex">
        <Title>{title}</Title>
      </Row>
      <Row>
        <Col
          lg={12}
          className="playlist-box d-flex flex-wrap justify-content-sm-center justify-content-md-center"
        >

          <TopMusicasItem />

        </Col>
      </Row>
    </Container>
  );
}

export default TopMusicas;
