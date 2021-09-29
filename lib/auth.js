import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import firebase from './firebase';
import { createUser } from './db';
import cookie from 'js-cookie';

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);
            const { token, ...userWithoutToken } = user;

            createUser(user.uid, userWithoutToken);
            setUser(user);

            cookie.set('feedback-app-auth', true, {
                expires: 1
            });

            return user;
        } else {
            Router.push('/');
            setUser(false);
            cookie.remove('feedback-app-auth');

            return false;
        }
    };

    const signinWithGitHub = () => {
        Router.push('/dashboard');
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => handleUser(response.user));
    };

    const signinWithGoogle = () => {
        Router.push('/dashboard');
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => handleUser(response.user));
    };

    const signout = () => {
        Router.push('/');

        return firebase
            .auth()
            .signOut()
            .then(() => handleUser(false));
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGitHub,
        signinWithGoogle,
        signout
    };
}

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token: user.ya,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL
    };
};
