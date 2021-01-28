import React, {useEffect, useState} from 'react';
import { Card, Dropdown, Accordion, Button } from 'react-bootstrap';
import { MdMoreHoriz } from 'react-icons/md';
import axios from 'axios';

// Context
import { useModal } from '../../Context/ModalsContext';
import { useLoading } from '../../Context/Caregando';
import { usePlaylist } from '../../Context/PlaylistContext';

import { AddPlaylist } from '../Modal';
import Loading from '../../Components/Loading';
import AddTrack from '../Modal/AddTrack'

import playlistImg from '../../img/playlist-img.jpg';

function TopMusicasItem() {
  const { setAddPlaylist } = useModal();
  const { carregando, setCarregando } = useLoading();
  const { topTracks, setTopTracks, trakUri, setTrakUri  } = usePlaylist();
  const[previa, setPrevia] = useState(false)

    // EFFECTS
    useEffect(() => {
      setPrevia(false)
      setCarregando(true);
      getTopTracks();
    }, []);

  function handleAddPlaylistModal({target}) {
    
    setAddPlaylist(true);
    let getTrack = target.dataset.trackid
    setTrakUri(getTrack)
  }
  function openPrevia() {
    setPrevia(true)
  }

  const getTopTracks = async () => {
    const response = await axios.get(
      'https://api.spotify.com/v1/artists/3p7PcrEHaaKLJnPUGOtRlT/top-tracks?market=br',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    try {
      await setTopTracks({ tracks: response.data.tracks });
      setCarregando(false);
    } catch (error) {
      <h1>Erro: Tente novamente mais tarde!</h1>;
    }
  };

  return (
    <>
      <AddPlaylist />
      {carregando && <Loading />}
      {!carregando && topTracks.tracks.map(track => (
      <div className="flex-wrap d-flex align-items-stretch justify-content-center"  key={track.id}>
<Card style={{ width: '15rem' }}>
      <Card.Img  variant="top" className="image-track" src={playlistImg} />
        <div className="d-flex justify-content-end">
          <Dropdown className="iconBox">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              <MdMoreHoriz size={25} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleAddPlaylistModal} data-trackid={track.id} >
                Adicionar a Playlist 
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
         <div className="d-flex flex-column align-items-center justify-content-between flex-grow-1">
         <h6 className="m-3">{track.name}</h6>
         <Accordion>
  <Card>

      <Accordion.Toggle  as={Button} onClick={openPrevia}  variant="success" eventKey={track.id}>
        Ouvir 
      </Accordion.Toggle>

    <Accordion.Collapse eventKey={track.id}>
      <Card.Body>
        {previa && <audio src={track.preview_url}  preload="none" controls></audio>}
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
         </div>
      </Card>

      <AddTrack trackId={trakUri} />
      </div>
      
      ))}

   </>
  );
}

export default TopMusicasItem;
