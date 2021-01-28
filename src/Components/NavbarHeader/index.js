import React, { useEffect } from 'react';
import { Navbar, Form, FormControl, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import { useUsers } from '../../Context/UserContext';
import { useLoading } from '../../Context/Caregando';

import Loading from '../../Components/Loading';

import { MdSearch } from 'react-icons/md';

function NavbarHeader() {
  const { users, setUsers } = useUsers();
  const { carregando, setCarregando } = useLoading();

  useEffect(() => {
    getHashParams();
    setCarregando(true);
    getUserInfo();
  }, []);

  // PEGAR ACCESS TOKEN
  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    setUsers({ access_token: hashParams.access_token });
    localStorage.setItem('access-token2', hashParams.access_token);
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem('lat', position.coords.latitude);
      localStorage.setItem('lon', position.coords.longitude);
    });
  }

  const getUserInfo = async () => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const { display_name, id } = await response.data;
      setUsers({
        access_token: localStorage.getItem('token'),
        id,
        display_name,
        images: response.data.images[0].url,
      });
      setCarregando(false);
    } catch (error) {
      <h1>Erro: Não foi possível recuperar os dados do usuário</h1>;
    }
  };

  return (
    <>
      {carregando && <Loading />}
      {!carregando && (
        <Navbar className="py-4 px-0">
          <Form inline className="mr-auto">
            <FormControl
              type="text"
              placeholder="Música, Album, Artist"
              className="mr-sm-2"
            />
            <Button variant="success" className="mr-4">
              <MdSearch size={22} color="#157347" />
            </Button>
          </Form>
          <div className="d-flex align-items-center mr-2">
            <Image src={users.images} className="img-user" />
          </div>
          <Navbar.Brand className="user-name">
            {users.display_name}
          </Navbar.Brand>
        </Navbar>
      )}
    </>
  );
}

export default NavbarHeader;
