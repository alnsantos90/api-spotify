import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

// Context
import { useModal } from '../../Context/ModalsContext';
import { usePlaylist } from '../../Context/PlaylistContext';

// ASSOSSIAR A CLIMA
function AddTrack({ trackId }) {
  const { addPlaylist, setAddPlaylist } = useModal();
  const { playlists } = usePlaylist();
  const [selectedPlaylist, setSelectedPlaylist] = useState();

  const onChangeSetPlaylist = ({ target }) => {
    const playlistAdd = target.value;
    setSelectedPlaylist(playlistAdd);
  };

  const setMusicPlaylist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `https://api.spotify.com/v1/playlists/${selectedPlaylist}/tracks?uris=spotify%3Atrack%3A${trackId}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAddPlaylist(false);
      return response;
    } catch (error) {
      <h1>Erro: Não foi possível recuperar os dados do usuário</h1>;
    }
  };

  return (
    <Modal
      size="md"
      show={addPlaylist}
      onHide={() => setAddPlaylist(false)}
      aria-labelledby="add-playlist-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-playlist-modal">
          Adicionar música á playlist
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Selecione a playlist que deseja adicionar a música</p>
        <Form onSubmit={setMusicPlaylist}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select" onChange={onChangeSetPlaylist}>
              <option value="">Selecionar clima</option>
              {playlists.items.map((playlist) => (
                <option value={playlist.id} key={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">
            Adicionar a playlist
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTrack;
