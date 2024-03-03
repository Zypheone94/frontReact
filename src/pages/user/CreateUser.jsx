import {useEffect} from "react";
import CreateUserForm from "../../components/forms/CreateUserForm.jsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const CreateUser = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            if (user !== null || user.email !== undefined) {
                navigate('/profile')
            }
        }
    }, []);

    return (
        <div className='mx-2 md:mx-12 md:mt-6 lg:mx-48'>
            <h2 className='text-pink font-bold mb-4'>Créer un compte</h2>
            <CreateUserForm/>
        </div>
    )
}

export default CreateUser