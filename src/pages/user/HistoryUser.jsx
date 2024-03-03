import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux"

import {api} from "../../utils/api.jsx";
import {useNavigate} from "react-router-dom";

import HistoryCard from "../../components/commons/product/HistoryCard.jsx";
import X from '../../assets/images/icons/X.jsx'

const HistoryUser = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const [productList, setProductList] = useState()
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteModalData, setDeleteModalData] = useState({title: "", id: ""});
    const [deleteValue, setDeleteValue] = useState('')
    const [displayWrong, setDisplayWrong] = useState(false)

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        } else {
            getAllUserProducts()
        }
    }, [])

    const getAllUserProducts = async () => {
        try {
            const response = await api('products/product/loadProductList', 'POST', {'seller_id': user.id});
            setProductList(response)
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    }

    const deleteProduct = async (title, productId, slug) => {
        setDeleteModalData({title: title, id: productId, slug: slug, seller: user.username});
        setDeleteModalOpen(true);
    };

    const confirmDeleteProduct = async () => {
        if (deleteModalData.title === deleteValue) {
            try {
                const response = await api("products/product/delete-product-list", "DELETE", {
                    productId: deleteModalData.id,
                    slug: deleteModalData.slug,
                    seller: user.username
                });
            } catch (error) {
                console.error("Error deleting product:", error);
            }
            setDisplayWrong(false)
            setDeleteModalOpen(false);
            setDeleteModalData({title: "", id: ""});
        } else {
            setDisplayWrong(true)
        }

        getAllUserProducts()
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeleteModalData({title: "", id: ""});
    };

    return (
        <>
            <h3 className='text-pink ml-6 mt-6'>Historique</h3>
            <div className='flex flex-wrap w-full'>
                {
                    productList && productList.length > 0 ?
                        productList.map((product, index) =>

                            (
                                <div className='relative w-full mx-4 mt-4'>
                                    <p className='absolute flex justify-center items-center text-xl top-4 right-0 h-6 w-6 lg:top-2 lg:w-10 lg:h-10 lg:left-0 lg:text-3xl'
                                       style={{
                                           backdropFilter: 'blur(10px)',
                                           borderRadius: '20px',
                                           color: 'red',
                                           cursor: 'pointer',
                                           zIndex: 40,
                                           border: '1px solid #F72585'
                                       }} onClick={() => {
                                        deleteProduct(product.title, product.productId, product.slug);
                                    }}><X size="25" color="red"/></p>
                                    <p className='absolute flex justify-center items-center text-xl top-4 right-0 h-6 w-6 lg:top-32 lg:w-10 lg:h-10 lg:left-0 lg:text-3xl'
                                       style={{
                                           backdropFilter: 'blur(10px)',
                                           borderRadius: '20px',
                                           color: 'blue',
                                           cursor: 'pointer',
                                           zIndex: 40,
                                           border: '1px solid #F72585'
                                       }} onClick={() => {
                                        navigate('/product/modify/' + product.slug)
                                    }}>?</p>
                                    <HistoryCard productValue={product}/>
                                </div>
                            )
                        ) :
                        <p>
                            Vous n'avez pas encore de produit mis en ligne
                        </p>
                }
            </div>
            {isDeleteModalOpen && (
                <div
                    className="modal open"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: "rgba(0, 0, 0, 0.5)",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}

                    onClick={(e) => {
                        if (e.target.classList.contains("modal")) {
                            closeDeleteModal();
                        }
                    }}
                >
                    <div className="modal-content w-5/6 flex flex-col justify-between md:w-3/4 lg:w-1/2" style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        zIndex: 9999,
                        height: '300px'
                    }}>
                        <h2 className='text-pink'>{deleteModalData.title}</h2>
                        <p>Merci d'entrer le titre de votre annonce pour valider sa suppression</p>
                        <input
                            type="text"
                            name="deleteValue"
                            onChange={e => setDeleteValue(e.target.value)}
                            className="w-3/4 p-1 md:w-2/4"
                            style={{
                                border: '1px solid #F72585',
                                borderRadius: '10px'
                            }}
                        />
                        <p style={{color: 'red'}}>{displayWrong ? 'Vous avez entré un titre éroné' : ''}</p>

                        <div className='flex justify-between'>
                            <button className='hover:text-pink' onClick={confirmDeleteProduct}>Confirmer la
                                suppression
                            </button>
                            <button onClick={closeDeleteModal} style={{color: 'red'}}>Annuler</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>

    )
}

export default HistoryUser