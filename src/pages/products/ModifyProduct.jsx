import {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom'

import {api} from "../../utils/api.jsx";
import WrongPage from "../WrongPage.jsx";

import ModifyProductForm from "../../components/forms/ModifyProductForm.jsx";
import {useSelector} from "react-redux";

const ModifyProduct = () => {

    const user = useSelector(state => state.user)
    const [productDetail, setProductDetail] = useState(null)
    const [display404, setDisplay404] = useState(false)
    const [loading, setLoading] = useState(true)
    const [productSlug, setProductSlug] = useState()


    const locate = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        const slug = locate.split('/').slice(3).join('/')
        setProductSlug(slug)
        getProductData(slug)
    }, []);

    const getProductData = async (slug) => {
        try {
            const response = await api(`products/read-product/${slug}`);
            setProductDetail(response);
            if (response.error === 100) {
                setDisplay404(true)
            }
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }

    return (
        <section className='md:mt-64 lg:mt-0'>
            {loading ? (
                <p>Chargement...</p>
            ) : (

                display404 === true ? (
                    <WrongPage/>
                ) : (
                    <ModifyProductForm productDetail={productDetail} setProductDetail={setProductDetail} slug={productSlug}/>
                )

            )}
        </section>)
}

export default ModifyProduct