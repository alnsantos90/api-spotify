import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

// Context
import { useModal } from '../../Context/ModalsContext';
import { usePlaylist } from '../../Context/PlaylistContext';
import { useUsers } from '../../Context/UserContext';
import { useLoading } from '../../Context/Caregando';

// ASSOSSIAR A CLIMA
export function AddPlaylist() {
  const { addPlaylist, setAddPlaylist } = useModal();
  const {
    playlists,
    newPlaylists,
    setNewPlaylists,
    topTracks,
    setTopTracks,
  } = usePlaylist();
  const [selectedPlaylist, setSelectedPlaylist] = useState();

  const onChangeSetPlaylist = ({ target }) => {
    const playlistAdd = target.value;
    setSelectedPlaylist(playlistAdd);
  };

  const setMusicPlaylist = async (e) => {
    e.preventDefault();

    try {
      // const newTrakUrl = newPlaylists.url.replaceAll(":", "%3A").replace("playlist", "tracks")
      // const newTrakUrl = "spotify:track:6juD9PQwAPvuXYIAE2gjhO"
      const response = await axios({
        url: `https://api.spotify.com/v1/playlists/${selectedPlaylist}/tracks?uris=spotify%3Atrack%3A${newPlaylists.uriTrack}`,
        // url: "https://api.spotify.com/v1/playlists/1XMmzUMTmJl2sbnG5h4VuL/tracks?uris=spotify%3Atrack%3A",
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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

// CRIAR PLAYLIST
export function CriarModal() {
  const { criarModal, setCriarModal } = useModal();
  const { newPlaylists, setNewPlaylists } = usePlaylist();
  const { users } = useUsers();
  const { setCarregando } = useLoading();

  // FUNCTIONS
  const handleChangeCreate = ({ target }) => {
    const name = target.value;
    setNewPlaylists(name);
  };

  const setCreatePlaylist = async (e) => {
    e.preventDefault();

    try {
      await axios({
        url: `https://api.spotify.com/v1/users/${users.id}/playlists`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: JSON.stringify({
          name: '${newPlaylists}',
        }),
      });

      setCriarModal(false);
      setCarregando(true);
    } catch (error) {
      <h1>Erro: Não foi possível recuperar os dados do usuário</h1>;
    }
  };

  return (
    <Modal
      size="md"
      show={criarModal}
      onHide={() => setCriarModal(false)}
      aria-labelledby="add-playlist"
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-playlist">Criar playlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Ao continuar, você autoriza o nosso App a acessar suas informações e
          criar uma nova playlist no spotify. Certifique-se que é o desejado
          antes de avançar!
        </p>
        <Form onSubmit={setCreatePlaylist}>
          <Form.Group>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Nome da playlist"
              onChange={handleChangeCreate}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Criar playlist
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
