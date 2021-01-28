import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Context
import ModalProvider from '../Context/ModalsContext';
import UsersProvider from '../Context/UserContext';
import PlayslistProvider from '../Context/PlaylistContext';
import CarregandoProvider from '../Context/Caregando';
import ClimaProvider from '../Context/ClimaContext';
import PlayClimaProvider from '../Context/PlayClimaContext';

import NavbarHeader from '../Components/NavbarHeader';
import MenuLeft from '../Components/MenuLeft';

import Lancamentos from '../Components/TopMusicas';
import Playlists from '../Components/Playlists';

function Home() {
  useEffect(() => {
    getLocale();
  }, []);

  // PEGAR ACCESS TOKEN
  function getLocale() {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem('lat', position.coords.latitude);
      localStorage.setItem('lon', position.coords.longitude);
    });
  }

  return (
    <CarregandoProvider>
      <UsersProvider>
        <PlayslistProvider>
          <ClimaProvider>
            <PlayClimaProvider>
              <Container fluid>
                <Row>
                  <Col md={4} sm={4} lg={3} className="p-0 position-relative">
                    <MenuLeft />
                  </Col>

                  <Col md={8} sm={8} lg={9} className="pl-5 navbarMain">
                    <ModalProvider>
                      <NavbarHeader />
                      <Lancamentos title="Músicas Recomendadas" />
                      <Playlists title="Minhas Playlists" />
                    </ModalProvider>
                  </Col>
                </Row>
              </Container>
            </PlayClimaProvider>
          </ClimaProvider>
        </PlayslistProvider>
      </UsersProvider>
    </CarregandoProvider>
  );
}

export default Home;
