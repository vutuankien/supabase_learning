import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
    const { session } = UserAuth();
    const [showRedirect, setShowRedirect] = useState(false);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        let timer;
        if (session === undefined) {
            setShowLoading(true);
        } else if (!session) {
            setShowLoading(true);
            timer = setTimeout(() => {
                setShowRedirect(true);
                setShowLoading(false);
            }, 1000);
        } else {
            setShowLoading(false);
        }
        return () => clearTimeout(timer);
    }, [session]);

    if (showLoading) {
        return <Loading />;
    }
    if (showRedirect) {
        return <Navigate to="/sign-in" replace />;
    }
    return <>{children}</>;
};

export default PrivateRoute;