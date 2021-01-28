import React, { createContext, useState, useContext } from 'react';

// CRIAÇÃO DE CONTEXTO GLOBAL
const UsersContext = createContext();

// CRIAÇÃO DE HOOK PERSONALIZADO
export function useUsers() {
  const context = useContext(UsersContext);
  const { users, setUsers } = context;
  return { users, setUsers };
}

// CRIAÇÃO FUNÇÃO QUE REPASSA ESTADO PARA TODOS OS FILHOS
export default function UsersProvider({ children }) {
  const [users, setUsers] = useState({
    id: '',
    access_token: '',
    display_name: '',
    images: '',
  });

  // RETORNA OS OS ESTADOS GLOBAIS
  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
