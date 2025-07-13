import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);
    const [error, setError] = useState(null);



    // signUpNewUser now takes email and password as arguments
    const signUpNewUser = async (email, password) => {
        setError(null);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            setError(error.message);
            console.log(error.message);
            return {
                success: false,
                error: error.message
            };
        } else {
            // Set session to data.session if available, otherwise to data.user (for email confirmation flow)
            setSession(data.session || data.user || null);

            console.log('User signed up successfully:', data.user);
            // If session is null, likely email confirmation is required
            return {
                success: true,
                data,
                needsConfirmation: !data.session
            };
        }
    };
    useEffect(() => {
        console.log('Session changed:', session);
    }, [session]);

    // Sign in
    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                setError(error.message);
                console.log(error.message);
                return {
                    success: false,
                    error: error.message
                };
            } else {
                setSession(data.session || data.user || null);
                console.log('User signed in successfully:', data.user);
                return {
                    success: true,
                    data
                };
            }



        } catch (error) {
            setError(error.message);
            console.log(error.message);
            return {
                success: false,
                error: error.message
            };

        }
    }


    useEffect(() => {
        let authListener;
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        authListener = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => {
            if (authListener && typeof authListener.subscription?.unsubscribe === 'function') {
                authListener.subscription.unsubscribe();
            }
        };
    }, []);


    // Sign Out
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            setError(error.message);
            console.log(error.message);
        } else {
            setSession(null);
            console.log('User signed out successfully');
            return {
                success: true

            };
        }
    };

    return (
        <AuthContext.Provider
            value={{ session, signUpNewUser, signOut, error, signInUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => useContext(AuthContext);