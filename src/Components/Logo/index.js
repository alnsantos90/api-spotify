import React from 'react';
import { Container, Image } from 'react-bootstrap';

import LogoSpotify from '../../img/logo.svg';

function Logo() {
  return (
    <Container className="d-flex justify-content-center align-items-center my-4">
      <Image src={LogoSpotify} width={40} className="mr-2" />
      <h4>Spotify-API</h4>
    </Container>
  );
}

export default Logo;
