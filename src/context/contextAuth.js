import React, { createContext, useState, useEffect } from 'react';
import {isSignedIn, loggedUser} from '../services/auth';

const Context = createContext();

function AuthProvider({ children }){
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        //cria uma funcao async, para aguardar antes de continuar
        const isAuth = async () => { 
            const token = await isSignedIn();
            if (token) {
                setAuthenticated(true);
                setUser(await loggedUser());
            }

            setLoading(false);
        }

        isAuth(); //executa a funcao async
        
    }, []);

    //Context e para passar informacoes para os filhos, praticamente um redux simplificado
    return (
        <Context.Provider value={{loading, authenticated, user}}>
            {children}
        </Context.Provider>
    );
}

export {Context, AuthProvider};