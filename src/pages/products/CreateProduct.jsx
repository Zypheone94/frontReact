import {useEffect, useState} from "react";

import CreateProductForm from "../../components/forms/CreateProductForm.jsx";

import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"


const CreateProduct = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const [loading, setLoading] = useState('true')

    useEffect(() => {
        console.log(user)
        if (user === null || user.email === undefined) {
            navigate('/login')
        }
        else {
            setLoading(false)
        }
    }, [])

    return (
        <div className='mx-2 md:mx-12 md:mt-64 lg:mt-6 lg:mx-48'>
            {
                !loading && (
                    <>
                        <h2 className='text-pink font-bold mb-4'>Mettre un article en vente</h2>
                        <CreateProductForm/>
                    </>
                )
            }

        </div>

    )
}

export default CreateProduct