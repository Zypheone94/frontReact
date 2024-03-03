import React, {useEffect, useState} from 'react';
import {api} from "../../utils/api.jsx";
import {useNavigate} from "react-router-dom";

const UserDataForm = ({user}) => {

    const [formMail, setFormMail] = useState(user.email);
    const [onLoad, setOnLoad] = useState(false)
    const [displayVerification, setDisplayVerification] = useState(false)
    const [checkCode, setCheckCode] = useState('')
    const [returnMessage, setReturnMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.email !== undefined) {
            null
        } else {
            navigate('/login')
        }
    })

    const handleInputChange = (e) => {
        setFormMail(e.target.value);
    };

    const handleCodeChange = (e) => {
        setCheckCode(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOnLoad(true)
        try {
            const response = await api('users/validation', 'POST', {formMail});
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
        }
        setOnLoad(false)
        setDisplayVerification(true)
    };

    const handleVerifyCode = async (e) => {
        let data = {'user_mail': user.email, 'check_code': checkCode}
        e.preventDefault();
        try {
            const response = await api('users/validation', 'PUT', data);
            if (response.status_code === 10) {
                setOnLoad(false)
                setReturnMessage('Votre mail à bien été changé, vous allez être redirigé vers la page de connexion !')
                setTimeout(() => {
                    navigate('/logout')
                }, 6000);
            }
            if (response.status_code === 15) {
                setReturnMessage('Code invalide')
            }
            if (response.status_code === 20) {
                setReturnMessage('Une erreur est survenu lors de la soumission de votre code')
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
        }
    }

    return (
        <>
            {!displayVerification ?
                !onLoad ? (

                    <form onSubmit={handleSubmit} className="flex flex-col justify-center">

                        <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                            <label className="pt-1" style={{
                                width: '100px'
                            }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={formMail}
                                onChange={handleInputChange}
                                className="w-3/4 p-1 md:w-2/4"
                                style={{
                                    border: '1px solid #F72585',
                                    borderRadius: '10px'
                                }}
                            />
                        </div>


                        <button type="submit"
                                className="mt-8 text-right duration-200 md:mt-12 hover:text-pink">Enregistrer
                        </button>
                    </form>
                ) : (
                    <div>Loading </div>
                ) : (
                    <form onSubmit={handleVerifyCode} className="flex flex-col justify-center">
                        <p className='my-8'>Un code de vérification vous a été envoyé par mail !</p>
                        <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                            <label className="pt-1" style={{
                                width: '100px'
                            }}>Code</label>
                            <input
                                type="text"
                                name="verification_code"
                                placeholder="Code de vérification"
                                required
                                onChange={handleCodeChange}
                                className="w-3/4 p-1 md:w-2/4"
                                style={{
                                    border: '1px solid #F72585',
                                    borderRadius: '10px'
                                }}
                            />
                        </div>
                        <button type="submit"
                                className="mt-8 text-right duration-200 md:mt-12 hover:text-pink">Vérifier le code
                        </button>
                    </form>
                )}
            {
                returnMessage ? (
                    <div style={{color: returnMessage === 'Votre mail à bien été changé, vous allez être redirigé vers la page de connexion !' ? 'lime' : 'red', marginBottom: '20px'}}>{returnMessage}</div>
                ) : (
                    <div></div>
                )
            }
        </>
    );
};

export default UserDataForm;
