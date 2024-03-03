import React, {useEffect, useState} from 'react'
import {api} from "../../utils/api.jsx";
import {useNavigate} from 'react-router-dom'

const CreateUserForm = () => {

    const [formData, setFormData] = useState({});
    const [returnError, setReturnError] = useState('')
    const [onLoad, setOnLoad] = useState(false)
    const [displayVerification, setDisplayVerification] = useState(false)
    const [checkCode, setCheckCode] = useState('')
    const [returnMessage, setReturnMessage] = useState('')
    const [invalidFields, setInvalidFields] = useState({});
    const [isFormValid, setIsFormValid] = useState(true);

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        const isAlphaValid = (val) => /^[a-zA-ZÀ-ÿ'-]+$/.test(val);
        const isUsernameValid = (val) => /^[a-zA-Z0-9._@-]+$/.test(val);

        let isFieldValid = false;

        if (name === 'password' || name === 'birthDate' || name === 'email' || name === 'verify_password') {
            isFieldValid = true;
        } else if (name === 'username') {
            isFieldValid = isUsernameValid(value);
        } else if (name === 'first_name' || name === 'last_name') {
            isFieldValid = isAlphaValid(value) || value === '';
        }

        if (name === 'first_name' || name === 'last_name') {
            const formattedValue = value.replace(/\s+/g, '-').trim();
            setFormData((prevFormData) => ({...prevFormData, [name]: formattedValue}));
        }

        setFormData((prevFormData) => ({...prevFormData, [name]: value}));

        setInvalidFields((prevInvalidFields) => ({
            ...prevInvalidFields,
            [name]: !isFieldValid,
        }));
    };

    useEffect(() => {
        const newIsFormValid = Object.values(invalidFields).every((field) => field === false);
        setIsFormValid(newIsFormValid);
    }, [invalidFields]);

    useEffect(() => {
        calcPasswordSecurity();
    }, [formData])

    const calcPasswordSecurity = () => {
        const password = formData?.password;
        let containsUppercase = false;
        let containsLowercase = false;
        let containsDigit = false;
        let containsSpecialChar = false;
        let passwordLength = false

        if (password) {

            if (!password || password.length > 7) {
                passwordLength = true;
            }

            for (let i = 0; i < password.length; i++) {
                const character = password[i];

                if (character >= 'A' && character <= 'Z') {
                    containsUppercase = true;
                } else if (character >= 'a' && character <= 'z') {
                    containsLowercase = true;
                } else if (character >= '0' && character <= '9') {
                    containsDigit = true;
                } else {
                    const specialChars = "!@#$%^&*";
                    if (specialChars.includes(character)) {
                        containsSpecialChar = true;
                    }
                }
            }
        }

        if (containsUppercase && containsLowercase && containsDigit && containsSpecialChar && passwordLength) {
            return 5;
        }

        return containsUppercase + containsLowercase + containsDigit + containsSpecialChar + passwordLength;
    };

    const handleCodeChange = (e) => {
        setCheckCode(e.target.value)
    }

    const handleSubmit = async (e) => {
        if (formData.password === formData.verify_password) {
            e.preventDefault()
            if (calcPasswordSecurity() <= 2) {
                setReturnError('Votre mot de passe n\'est pas assez sécurisé')
            } else {

                setOnLoad(true)
                try {
                    const response = await api('users/validation', 'POST', {'formMail': formData.email});
                } catch (error) {
                    console.error('Erreur lors de l\'envoi de l\'email :', error);
                }
                setOnLoad(false)
                setDisplayVerification(true)
            }

        } else {
            e.preventDefault()
            setReturnError('Les deux mots de passes ne sont pas identiques')
        }
    }

    const trimFormData = () => {
        setFormData((prevFormData) => {
            const trimmedFormData = {};
            for (const key in prevFormData) {
                if (Object.prototype.hasOwnProperty.call(prevFormData, key)) {
                    trimmedFormData[key] = prevFormData[key].trim();
                }
            }
            return trimmedFormData;
        });
    };

    const handleVerifyCode = async (e) => {
        let data = {'check_code': checkCode}
        e.preventDefault();
        try {
            const response = await api('users/validation', 'PUT', data);
            if (response.status_code === 10) {
                setOnLoad(false)
                trimFormData()
                const create = await api('users/create', 'POST', formData)
                if (create.status === 10) {
                    setReturnMessage('Votre compte a bien été crée, vous allez être redirigé vers la page de connexion !')
                    setTimeout(() => {
                        navigate('/login')
                    }, 6000);
                } else if (create.status === 40) {
                    setReturnError("L'email entré est déjà associé à un compte")
                    setDisplayVerification(false)
                } else if (create.status === 50) {
                    setReturnError("Le pseudo entré est déjà utilisé")
                    setDisplayVerification(false)
                } else {
                    console.log(response)
                }
            }

            if (response.status_code === 20) {
                setReturnError('Une erreur est survenu lors de la soumission de votre code')
            }
            if (response.status_code === 15) {
                setReturnError('Code de vérification érroné')
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
        }
    }

    return (
        <>
            {!displayVerification ?
                !onLoad ? (

                        <form className="mb-10" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap">
                                <div className="mt-6 w-full flex justify-between">
                                    <label className="w-2/5">Nom</label>
                                    <input type="text"
                                           className={`w-3/5 p-1 md:w-2/4 ${invalidFields["last_name"] ? 'invalid-input' : ''}`}
                                           style={{
                                               border: '1px solid #F72585',
                                               borderRadius: '10px',
                                               ...(invalidFields["last_name"] && {
                                                   border: '2px solid red',
                                                   backgroundColor: '#FFD9D9',
                                               })
                                           }}
                                           name="last_name"
                                           onChange={(e) => handleInputChange(e, ["last_name"])}
                                           required/>
                                </div>
                                <div className="mt-6 w-full flex justify-between">
                                    <label className="w-2/5">Prénom</label>
                                    <input type="text"
                                           className={`w-3/5 p-1 md:w-2/4 ${invalidFields["first_name"] ? 'invalid-input' : ''}`}
                                           style={{
                                               border: '1px solid #F72585',
                                               borderRadius: '10px',
                                               ...(invalidFields["first_name"] && {
                                                   border: '2px solid red',
                                                   backgroundColor: '#FFD9D9',
                                               })
                                           }}
                                           name="first_name"
                                           onChange={(e) => handleInputChange(e, ["first_name"])}
                                           required/>
                                </div>
                            </div>
                            <div className="mt-6 w-full flex justify-between">
                                <label className="w-2/5">Email</label>
                                <input type="email"
                                       className="w-3/5 p-1 md:w-2/4"
                                       style={{
                                           border: '1px solid #F72585',
                                           borderRadius: '10px'
                                       }}
                                       name="email"
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="mt-6 w-full flex justify-between">
                                <label className="w-2/5">Pseudo</label>
                                <input
                                    type="text"
                                    className={`w-3/5 p-1 md:w-2/4 ${invalidFields["username"] ? 'invalid-input' : ''}`}
                                    style={{
                                        border: '1px solid #F72585',
                                        borderRadius: '10px',
                                        ...(invalidFields["username"] && {
                                            border: '2px solid red',
                                            backgroundColor: '#FFD9D9',
                                        })
                                    }}
                                    name="username"
                                    onChange={(e) => handleInputChange(e, ["username"])}
                                    required
                                />
                            </div>
                            <div className="mt-6 w-full flex justify-between">
                                <label className="w-2/5">Date de naissance</label>
                                <input type="date"
                                       className="w-3/5 p-1 md:w-2/4"
                                       style={{
                                           border: '1px solid #F72585',
                                           borderRadius: '10px'
                                       }}
                                       name="birthDate"
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="flex flex-wrap justify-end">
                                <div className="mt-6 w-full flex justify-between">
                                    <label className="w-2/5">Mot de passe</label>
                                    <input type="password"
                                           className="w-3/5 p-1 md:w-2/4"
                                           style={{
                                               border: '1px solid #F72585',
                                               borderRadius: '10px'
                                           }}
                                           name="password"
                                           onChange={handleInputChange}
                                           required/>
                                </div>
                                <div style={{
                                    width: '200px',
                                    border: '1px solid black',
                                    borderRadius: '10px',
                                    marginTop: '30px',
                                    padding: '2px'
                                }}>
                                    <div style={{
                                        width: `calc(20% * ${calcPasswordSecurity()})`,
                                        height: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: calcPasswordSecurity() === 1 ? 'red'
                                            : calcPasswordSecurity() === 2 ? 'orange'
                                                : calcPasswordSecurity() === 3 ? 'orange'
                                                    : calcPasswordSecurity() === 4 ? 'lime'
                                                        : calcPasswordSecurity() === 5 ? 'lime' : ''
                                    }}/>
                                </div>
                                <div className="mt-6 w-full flex justify-between">
                                    <label className="w-2/5">Confirmation</label>
                                    <input type="password" className="w-3/5 p-1 md:w-2/4"
                                           style={{
                                               border: '1px solid #F72585',
                                               borderRadius: '10px'
                                           }}
                                           name="verify_password"
                                           onChange={handleInputChange}
                                           required/>
                                </div>
                            </div>
                            {
                                returnError ? (
                                    <p style={{color: 'red', marginTop: '20px'}}>{returnError}</p>
                                ) : (
                                    <></>
                                )
                            }
                            <div className='w-full mt-12 flex flex-row-reverse justify-between'>
                                <button type="submit" className="hover:text-pink"
                                        disabled={!isFormValid}
                                        style={{
                                            color: !isFormValid ? 'grey' : 'black',
                                        }}>
                                    Créer le compte
                                </button>
                                <button className="hover:text-pink" onClick={() => navigate('/login')}>
                                    Vous avez déjà un compte ?
                                </button>
                            </div>
                        </form>)
                    : (<div>Loading</div>
                    ) : (<form onSubmit={handleVerifyCode} className="flex flex-col justify-center">
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
                            className="mt-8 mb-8 text-right duration-200 md:mt-12 hover:text-pink">Vérifier le code
                    </button>
                    <p style={{color: 'lime', marginBottom: '20px'}}>{returnMessage}</p>
                </form>)
            }
        </>
    )
}

export default CreateUserForm