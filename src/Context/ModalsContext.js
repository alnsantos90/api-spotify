import React, { createContext, useState, useContext } from 'react';

// CRIAÇÃO DE CONTEXTO GLOBAL
const ModalContext = createContext();

// CRIAÇÃO DE HOOK PERSONALIZADO
export function useModal() {
  const context = useContext(ModalContext);
  const {
    criarModal,
    setCriarModal,
    assossiarModal,
    setAssossiarModal,
    deletarModal,
    setDeletarModal,
    addPlaylist,
    setAddPlaylist,
    verMusicasModal,
    setVerMusicasModal,
  } = context;
  return {
    criarModal,
    setCriarModal,
    assossiarModal,
    setAssossiarModal,
    deletarModal,
    setDeletarModal,
    addPlaylist,
    setAddPlaylist,
    verMusicasModal,
    setVerMusicasModal,
  };
}

// CRIAÇÃO FUNÇÃO QUE REPASSA ESTADO PARA TODOS OS FILHOS
export default function ModalProvider({ children }) {
  const [criarModal, setCriarModal] = useState();
  const [assossiarModal, setAssossiarModal] = useState();
  const [deletarModal, setDeletarModal] = useState();
  const [addPlaylist, setAddPlaylist] = useState();
  const [verMusicasModal, setVerMusicasModal] = useState();

  // RETORNA OS OS ESTADOS GLOBAIS
  return (
    <ModalContext.Provider
      value={{
        criarModal,
        setCriarModal,
        assossiarModal,
        setAssossiarModal,
        deletarModal,
        setDeletarModal,
        addPlaylist,
        setAddPlaylist,
        verMusicasModal,
        setVerMusicasModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
