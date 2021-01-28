import React from 'react';
import { MdAdd } from 'react-icons/md';
import { Container, Button, Row, Col } from 'react-bootstrap';

// Context
import { useModal } from '../../Context/ModalsContext';

import { CriarModal } from '../Modal';
import Title from '../Title';
import PlaylistsItem from '../PlayslistsItem';

function Playlists({ title }) {
  const { setCriarModal } = useModal();
  function handleCriarPlaylist() {
    setCriarModal(true);
  }
  return (
    <Container fluid className="my-3">
      <Row className="d-flex">
        <Title>
          {title}
          <Button
            onClick={handleCriarPlaylist}
            variant="success"
            className="btn-sm ml-4 d-inline-flex align-items-center"
          >
            <MdAdd size={25} />
          </Button>
        </Title>
      </Row>
      <Row>
        <Col
          lg={12}
          className="playlist-box d-flex flex-wrap justify-content-sm-center justify-content-md-center"
        >
          <PlaylistsItem />
        </Col>
      </Row>
      <CriarModal />
    </Container>
  );
}

export default Playlists;
