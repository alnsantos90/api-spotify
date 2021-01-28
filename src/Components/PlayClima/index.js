import React from 'react';
import { Container } from 'react-bootstrap';

import { useLoading } from '../../Context/Caregando';

import Loading from '../../Components/Loading';

import Title from '../Title';

function PlayClimaBox({ title }) {
  const { carregando } = useLoading();

  return (
    <>
      <Title>{title}</Title>
      {carregando && <Loading />}
      {!carregando && (
        <Container fluid className="play-clima">
          <Container className="d-flex align-items-center">
            <p className="m-0">Não há playlist</p>
          </Container>
        </Container>
      )}
    </>
  );
}

export default PlayClimaBox;
