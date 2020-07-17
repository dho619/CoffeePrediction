import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }){

    const {loading, authenticated, token, user, onSignIn, onSignOut} = useAuth();
    
    //Context e para passar informacoes para os filhos, praticamente um redux simplificado
    return (
        <Context.Provider value={{loading, authenticated, token, user, onSignIn, onSignOut}}>
            {children}
        </Context.Provider>
    );
}

export {Context, AuthProvider};