import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div
      style={{
        width: '100%',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c273a',
      }}
    >
      <Spinner animation="border" variant="light" />
    </div>
  );
}

export default Loading;
