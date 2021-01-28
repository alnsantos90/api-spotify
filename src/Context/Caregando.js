import React, { createContext, useState, useContext } from 'react';

// CRIAÇÃO DE CONTEXTO GLOBAL
const CarregandoContext = createContext();

// CRIAÇÃO DE HOOK PERSONALIZADO
export function useLoading() {
  const context = useContext(CarregandoContext);
  const { carregando, setCarregando } = context;
  return { carregando, setCarregando };
}

// CRIAÇÃO FUNÇÃO QUE REPASSA ESTADO PARA TODOS OS FILHOS
export default function CarregandoProvider({ children }) {
  const [carregando, setCarregando] = useState(false);

  // RETORNA OS OS ESTADOS GLOBAIS
  return (
    <CarregandoContext.Provider
      value={{
        carregando,
        setCarregando,
      }}
    >
      {children}
    </CarregandoContext.Provider>
  );
}
