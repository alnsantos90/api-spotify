import React from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap'

import LogoSpotify from '../img/logo.svg';

function Login() {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL
  } = process.env;

  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };
  return (
    <Container fluid className="bg-login">
      <Row style={{height: "100vh"}}>
        <Col className="d-flex justify-content-center flex-column align-items-center">
          <Image src={LogoSpotify} width={100} />
        <Button variant="success" className="btn-lg mt-4" type="submit" onClick={handleLogin}>
  Logar via Spotify
</Button>
        </Col>
      </Row>
    </Container>
    
    );
}


export default Login;