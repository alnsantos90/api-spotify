import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { useModal } from '../../Context/ModalsContext';

// ASSOSSIAR A CLIMA
function AssossiarClima({ playlistId }) {
  const { assossiarModal, setAssossiarModal } = useModal();
  return (
    <Modal
      size="md"
      show={assossiarModal}
      onHide={() => setAssossiarModal(false)}
      aria-labelledby="assossiar-playlist"
    >
      <Modal.Header closeButton>
        <Modal.Title id="assossiar-playlist">
          Assossiar Playlist: name playlist
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Selecione a temperatura que deseja assosiar sua playlist para ouvi-la
          sempre que o clima estiver na sua vibe.
        </p>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select">
              <option value="">Selecionar clima</option>
              <option value="muito-quente">
                Muito Quente (acima de 30 graus)
              </option>
              <option value="quente">Quente (de 20 a 30 graus)</option>
              <option value="frio">Frio (de 10 a 19 graus)</option>
              <option value="muito-frio">
                Muito Frio (abaixo de 10 graaus)
              </option>
            </Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">
            Assossiar ao clima
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AssossiarClima;
