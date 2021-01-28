import React, { createContext, useState, useContext } from 'react';

// CRIAÇÃO DE CONTEXTO GLOBAL
const ClimaContext = createContext();

// CRIAÇÃO DE HOOK PERSONALIZADO
export function useClima() {
  const context = useContext(ClimaContext);
  const { temperatura, setTemperatura, playClima, setPlayClima } = context;
  return { temperatura, setTemperatura, playClima, setPlayClima };
}

// CRIAÇÃO FUNÇÃO QUE REPASSA ESTADO PARA TODOS OS FILHOS
export default function ClimaProvider({ children }) {
  const [temperatura, setTemperatura] = useState({
    country: null,
    name: null,
    temp: null,
    temp_max: null,
    temp_min: null,
  });

  const [playClima, setPlayClima] = useState({
    muitoQuente: null,
    quente: null,
    frio: null,
    muitoFrio: null,
  });

  // RETORNA OS OS ESTADOS GLOBAIS
  return (
    <ClimaContext.Provider
      value={{
        temperatura,
        setTemperatura,
        playClima,
        setPlayClima,
      }}
    >
      {children}
    </ClimaContext.Provider>
  );
}
