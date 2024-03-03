import React, {useState, useEffect} from 'react';
import UserDataForm from "../../components/forms/UserDataForm.jsx";
import UserMailForm from "../../components/forms/UserMailForm.jsx";

import {api} from "../../utils/api.jsx";
import DelaiRender from "../../utils/DelaiRender.jsx";

import {useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom"
import {setUser} from "../../redux/actions/userActions.jsx";

import {useDispatch} from 'react-redux';
import UserPasswordForm from "../../components/forms/UserPasswordForm.jsx";

const UserProfile = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch();

    const url = location.pathname.split('/')

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        birthDate: '',
        email: ''
    });

    useEffect(() => {
        if (user && user.email !== undefined) {
            setUserData((prevUserData) => ({
                ...prevUserData,
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                birthDate: user.birthDate || '',
                email: user.email || ''
            }));
        } else {
            navigate('/login')
        }
    }, []);

    const handleUpdateUser = async (updatedUserData) => {
        let requestDate = {
            id: user.id,
            data: updatedUserData
        }
        try {
            const updatedUser = await api('/users/modify', 'PUT', requestDate);
            setUserData(updatedUser);
            const newUserValue = await api('/users/detail', 'POST', requestDate)
            dispatch(setUser(newUserValue.user));
            navigate('/profile')
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
    };

    const handleSendMail = () => {
        console.log('mail !')
    }

    return (
        <div className="mx-12 md:mt-6 md:text-lg">
            <h1 className="text-pink md:text-xl">Profil de l'utilisateur</h1>
            <DelaiRender>
                {
                    url[url.length - 1] === 'data' ? (
                        <UserDataForm user={userData} onUpdate={handleUpdateUser}/>
                    ) : (
                        url[url.length - 1] === 'mail' ? (
                            <UserMailForm user={userData}/>
                        ) : (
                            url[url.length - 1] === 'password' ? (
                                <UserPasswordForm user={userData} />
                            ) : (
                                <></>
                            )
                        )
                    )
                }

            </DelaiRender>
        </div>
    );
};

export default UserProfile;
