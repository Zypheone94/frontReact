import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'
import {api} from '../../utils/api.jsx'

// Import utils pour Redux

import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/actions/userActions';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('')

    const navigate = useNavigate();
    // Const for Redirection
    const dispatch = useDispatch();
    // Const for Redux

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api('/users/login', 'POST', {
                email: email,
                password: password
            });
            if (response.error === 'Invalid credentials') {
                setLoginError('Vos identifiants sont incorrect')
            }
            const data = response.user_info;

            Cookies.set('access_token', response.token, {
                secure: true,
                sameSite: 'strict',
                expires: 30
            });
            Cookies.set('refresh_token', response.refresh, {secure: true, sameSite: 'strict', expires: 7});

            dispatch(setUser(data));

            navigate('/')
        } catch (error) {

        }
    };

    return (
        <div className='mx-2 md:mx-12 md:mt-6 lg:mx-36'>
            <h2 className='text-pink font-bold mb-4'>Connexion</h2>
            <form onSubmit={handleLogin} className=''>
                <div>
                    <div className='md:flex md:justify-center'>
                        <label className="w-full text-left md:pt-1 md:text-center md:w-1/2">Adresse
                            Email</label>
                        <div
                            className="md:w-2/4 flex flex-col items-start md:items-end lg:items-start w-full my-6 md:my-0">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className='p-1 w-full md:w-5/6'
                                style={{
                                    border: '1px solid #F72585',
                                    borderRadius: '10px',
                                }}
                            />
                        </div>
                    </div>
                    <div className='md:flex md:justify-center md:mt-12'>
                        <label className="w-full text-left mb-6 md:mb-0 md:pt-1 md:text-center md:w-1/2">Mot de
                            passe</label>
                        <div
                            className="md:w-2/4 flex flex-col items-start md:items-end lg:items-start w-full my-6 md:my-0">
                            <input
                                type="password"
                                id="password"
                                placeholder="Mot de passe"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className='p-1 w-full md:w-5/6'
                                style={{
                                    border: '1px solid #F72585',
                                    borderRadius: '10px',
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-end mt-10 md:mt-24 mx-8'>
                    {
                        loginError ? (
                            <p style={{color: 'red', marginBottom: '20px'}}>{loginError}</p>
                        ) : (
                            <></>
                        )
                    }
                    <div className="flex flex-row-reverse items-center justify-between w-full mt-10 mb-20
                    md:mt-0">
                        <button type="submit" className='hover:text-pink'>Se connecter</button>
                        <button onClick={() => navigate('/create')} className="hover:text-pink">Créer un compte</button>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Login
