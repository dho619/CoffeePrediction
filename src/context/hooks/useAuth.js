import { useState, useEffect } from 'react';

import { isSignedIn, loggedUser, addUserToken, clearUserToken } from '../auxAuth';

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        //cria uma funcao async, para aguardar antes de continuar
        const isAuth = async () => { 
            const token = await isSignedIn();
            if (token !== '') {
                setAuthenticated(true);
                setToken(token);
                setUser(await loggedUser());
            }

            setLoading(false);
        }

        isAuth(); //executa a funcao async
        
    }, []);

    async function onSignIn(token){
        await addUserToken(token);
        setUser(await loggedUser());
        setAuthenticated(true);
    };

    async function onSignOut(){
        clearUserToken();
        setUser({});
        setAuthenticated(false);
    };

    return {loading, authenticated, token, user, onSignIn, onSignOut}
};