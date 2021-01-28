import React, { useEffect, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { MdMoreHoriz } from 'react-icons/md';
import axios from 'axios';

// Context
import { useModal } from '../../Context/ModalsContext';
import { usePlaylist } from '../../Context/PlaylistContext';
import { useLoading } from '../../Context/Caregando';

import Loading from '../../Components/Loading';
import AssociarClima from '../Modal/AssociarPlaylist';
import MusicasPlaylist from '../Modal/MusicasPlaylist';
import playlistImg from '../../img/playlist-img.jpg';

function PlayslistsItem() {
  // HOOKS
  const { setVerMusicasModal } = useModal();
  const { setAssociarModal } = useModal();
  const { playlists, setPlaylists } = usePlaylist();
  const { carregando, setCarregando } = useLoading();
  const [getMusicaId, setGetMusicaId] = useState();
  const [associarId, setAssociarId] = useState();

  // EFFECTS
  useEffect(() => {
    setCarregando(true);
    getUserPlaylist();
  }, []);
  useEffect(() => {
    getUserPlaylist();
  }, [carregando]);

  // FUNCTIONS
  const getUserPlaylist = async () => {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/playlists',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    try {
      setPlaylists({ items: response.data.items });
      setCarregando(false);
    } catch (error) {
      <h1>Erro: Tente novamente mais tarde!</h1>;
    }
  };

  function handleVerMusicasPlaylist({ target }) {
    let getMusicas = target.dataset.musicasplaylist;
    setGetMusicaId(getMusicas);
    setVerMusicasModal(true);
  }
  function handleAssociarPlaylist({ target }) {
    let getPlay = target.dataset.playid;
    setAssociarId(getPlay);
    setAssociarModal(true);
  }

  return (
    <>
      {carregando && <Loading />}
      {!carregando &&
        playlists.items.map((playlist) => (
          <div key={playlist.id} className="d-flex align-items-stretch">
            <Card style={{ width: '15rem' }}>
              <Card.Img
                variant="top"
                className="image-playlist"
                src={playlistImg}
              />
              <Card.Body>
                <Card.Title>{playlist.name}</Card.Title>
                <div className="d-flex justify-content-end align-items-stretch">
                  <Dropdown className="iconBox">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      <MdMoreHoriz size={25} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={handleAssociarPlaylist}
                        data-playid={playlist.id}
                      >
                        Associar á um clima
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={handleVerMusicasPlaylist}
                        data-musicasplaylist={playlist.id}
                      >
                        Ver musicas da playlist
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card.Body>
              <AssociarClima playlistId={associarId} />
            </Card>
            <MusicasPlaylist musicasId={getMusicaId} />
          </div>
        ))}
    </>
  );
}

export default PlayslistsItem;
