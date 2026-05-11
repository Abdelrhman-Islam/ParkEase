import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';

const ProtectedRoute = () => {

    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {

        api.get('/user')
            .then(() => setIsAuth(true))
            .catch(() => setIsAuth(false))
            .finally(() => setLoading(false));

    }, []);

    if (loading) return null;

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;