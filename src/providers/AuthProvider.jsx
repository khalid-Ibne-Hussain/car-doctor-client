import { createContext, useEffect, useState } from "react";
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    // const linkedInProvider = new LinkedInA



    // email pass registration
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in with email pass
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google sign in
    const handleGoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);

    }

    // facebook sign in
    const handleFacebookLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider)
    }

    // linked In sign in

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('current user: ', currentUser);

            setLoading(false);

            if (currentUser && currentUser.email) {
                const loggedUser = {
                    email: currentUser.email
                }
                fetch('https://car-doctor-server-gamma.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('JWT response', data);
                        // warning: local storage is not the best to store access token
                        localStorage.setItem('car-access-token', data.token);

                    })
            }
            else {
                localStorage.removeItem('car-access-token');
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        handleGoogleLogin,
        handleFacebookLogin,
        logOut,

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;