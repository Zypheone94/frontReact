import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { api } from '../../utils/api'; // Assurez-vous d'importer correctement votre fonction api

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleLogout = async () => {
            const refreshToken = Cookies.get('refresh_token');

            try {
                const response = await api('/users/logout', 'POST', { refresh_token: refreshToken });
                console.log(response)
                if (response.status === 205) {
                    dispatch(setUser(null));
                    Cookies.remove('access_token')
                    Cookies.remove('refresh_token')
                    navigate('/login');
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        handleLogout();
    }, [dispatch, navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
}

export default Logout;
