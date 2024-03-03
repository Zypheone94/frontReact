import React, {useState} from "react";
import {useSelector} from "react-redux"
import {api} from "../../utils/api.jsx";
import {useNavigate} from "react-router-dom";

const DeleteUser = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const [deleteValue, setDeleteValue] = useState('')
    const [returnMessage, setReturnMessage] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (deleteValue === user.username) {
            api('/users/delete', 'DELETE', {'id': user.id, 'username': user.username})
                .then((response) => {
                    console.log(response)
                    setReturnMessage('Votre compte a bien été supprimé, vous allez être déconnecté !')
                    setTimeout(() => {
                        navigate('/logout')
                    }, 6000);
                })
                .catch((error) => {
                    console.warn('Error while delete user:', error);
                });
        } else {
            console.log('nop')
        }
    }

    return (
        <>
            <div className="mx-12 md:mt-6 md:text-lg">
                <h1 className="text-pink md:text-xl">Supprimer votre profil</h1>
                <p className='mt-6'>Afin de valider la suppression de votre compte, merci de taper votre nom
                    d'utilisateur puis de valider votre demande</p>
                <form onSubmit={(e) => handleSubmit(e)}
                      className="mt-6 flex flex-col md:flex-row justify-between items-end md:items-center">
                    <input type="text" onChange={e => setDeleteValue(e.target.value)}
                           className="w-full p-1 md:w-2/4"
                           style={{
                               border: '1px solid #F72585',
                               borderRadius: '10px'
                           }}
                           placeholder="Nom d'utilisateur"/>
                    <button className="mt-8 text-right duration-200 md:mt-0
                    hover:text-pink">Supprimer le compte
                    </button>
                </form>
                {returnMessage && (
                    <p style={{color: 'lime', marginTop: '40px'}}>{returnMessage}</p>
                )}
            </div>
        </>
    )
}

export default DeleteUser