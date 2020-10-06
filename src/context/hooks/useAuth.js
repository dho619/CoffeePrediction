import { useState, useEffect } from 'react';

import { isSignedIn, loggedUser, addUserToken, clearUserToken } from '../authenticationFunctions';

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        //cria uma funcao async, para aguardar antes de continuar
        const isAuth = async () => { 
            const token = await isSignedIn();

            const userLogged = await loggedUser()
            if (userLogged) {
                setAuthenticated(true);
                setToken(token);
                setUser(userLogged);
            } else{
                setAuthenticated(false);
                setToken('');
                setUser({}); 
            }
            setLoading(false);
        }

        isAuth(); //executa a funcao async
        
    }, []);

    async function onSignIn(token){
        await addUserToken(token);
        setToken(token);
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