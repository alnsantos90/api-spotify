import React, { createContext, useState, useContext } from 'react';

// CRIAÇÃO DE CONTEXTO GLOBAL
const PlaylistContext = createContext();

// CRIAÇÃO DE HOOK PERSONALIZADO
export function usePlaylist() {
  const context = useContext(PlaylistContext);
  const {
    playlists,
    setPlaylists,
    trakUri,
    setTrakUri,
    topTracks,
    setTopTracks,
    newPlaylists,
    setNewPlaylists,
    totalTracks,
    setTotalTracks,
  } = context;
  return {
    playlists,
    setPlaylists,
    trakUri,
    setTrakUri,
    topTracks,
    setTopTracks,
    newPlaylists,
    setNewPlaylists,
    totalTracks,
    setTotalTracks,
  };
}

// CRIAÇÃO FUNÇÃO QUE REPASSA ESTADO PARA TODOS OS FILHOS
export default function PlayslistProvider({ children }) {
  const [playlists, setPlaylists] = useState({
    items: [],
  });
  const [topTracks, setTopTracks] = useState({
    tracks: [],
  });
  const [trakUri, setTrakUri] = useState({
    uriTrack: '',
  });

  const [newPlaylists, setNewPlaylists] = useState({
    name: '',
  });
  const [totalTracks, setTotalTracks] = useState({
    items: [],
  });

  // RETORNA OS OS ESTADOS GLOBAIS
  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        setPlaylists,
        trakUri,
        setTrakUri,
        topTracks,
        setTopTracks,
        newPlaylists,
        setNewPlaylists,
        totalTracks,
        setTotalTracks,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
