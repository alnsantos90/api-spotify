import React, { createContext, useState, useContext } from 'react';

// CRIAÇÃO DE CONTEXTO GLOBAL
const PlayClimaContext = createContext();

// CRIAÇÃO DE HOOK PERSONALIZADO
export function usePlayClima() {
  const context = useContext(PlayClimaContext);
  const { tocando, setTocando } = context;
  return { tocando, setTocando };
}

// CRIAÇÃO FUNÇÃO QUE REPASSA ESTADO PARA TODOS OS FILHOS
export default function PlayClimaProvider({ children }) {
  const [tocando, setTocando] = useState();

  // RETORNA OS OS ESTADOS GLOBAIS
  return (
    <PlayClimaContext.Provider
      value={{
        tocando,
        setTocando,
      }}
    >
      {children}
    </PlayClimaContext.Provider>
  );
}
