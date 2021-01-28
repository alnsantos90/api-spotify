import React, { useEffect } from 'react';
import { Modal, Container, Button } from 'react-bootstrap';
import axios from 'axios';

// Context
import { useModal } from '../../Context/ModalsContext';
import { usePlaylist } from '../../Context/PlaylistContext';
import { useLoading } from '../../Context/Caregando';

import Loading from '../../Components/Loading';

function MusicasPlaylist({ musicasId }) {
  const { carregando, setCarregando } = useLoading();
  const { verMusicasModal, setVerMusicasModal } = useModal();
  const { totalTracks, setTotalTracks } = usePlaylist();

  useEffect(() => {
    setCarregando(true);
    getUrl();
  }, [verMusicasModal]);

  const getUrl = () => {
    if (musicasId) {
      getMusicasCurrentPlaylist();
    }
    setCarregando(false);
  };
  const getMusicasCurrentPlaylist = async () => {
    const response = await axios({
      url: `https://api.spotify.com/v1/playlists/${musicasId}/tracks`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    try {
      await setTotalTracks({ items: response.data.items });
      console.log(response.data.items);
      setCarregando(false);
    } catch (error) {
      <h1>Erro: Não foi possível recuperar os dados do usuário</h1>;
    }
  };

  const deleteTrack = async ({ target }) => {
    setCarregando(true);
    let deleteUriTrack = target.dataset.delete;
    const response = await axios({
      url: `https://api.spotify.com/v1/playlists/${musicasId}/tracks`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: JSON.stringify({
        tracks: [
          {
            uri: deleteUriTrack,
          },
        ],
      }),
    });
    try {
      return response;
      setCarregando(false);
    } catch (error) {
      <h1>Erro: Não foi possível recuperar os dados do usuário</h1>;
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={verMusicasModal}
        onHide={() => setVerMusicasModal(false)}
        aria-labelledby="add-playlist-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-playlist-modal">Musicas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {carregando && <Loading />}
          {!carregando &&
            totalTracks.items.map(({ track }) => (
              <Container fluid className="play-clima" key={track.id}>
                <Container className="d-flex align-items-center justify-content-between">
                  <h4 className="m-0">{track.name}</h4>
                  <Button
                    variant="danger"
                    data-delete={track.uri}
                    onClick={deleteTrack}
                  >
                    Deletar
                  </Button>
                </Container>
              </Container>
            ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MusicasPlaylist;
