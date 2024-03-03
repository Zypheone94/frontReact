import {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";
import WrongPage from "../WrongPage.jsx";
import {nommage} from "../../utils/nommage.jsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";



function ProductDetail() {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const [productDetail, setProductDetail] = useState([])
    // State qui va contenir tout les détails liées à mon produit
    const [loading, setLoading] = useState(true)
    // State qui va permettre de savoir si les données de l'api sont en cours de récupération
    const [display404, setDisplay404] = useState(false)
    // State qui va retourner la page 404 en cas de produit non trouvé
    const [selectedImage, setSelectedImage] = useState(0)

    const url = window.location.pathname;
    const productSlug = url.split('/').pop();

    const addProductToCart = async () => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        } else {
            try {
                const req = await api('cart/cart/add-to-cart/', "POST", {
                    user_id: user.id,
                    product_id: productDetail.productId,
                    image: productDetail.images ? productDetail.images[0] : 'src/assets/images/Placeholder.jpg'
                })
                navigate('/cart')
            }
            catch (err) {
                console.log(err)
            }
        }


    }

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api(`products/read-product/${productSlug}`);
                setProductDetail(response);
                if (response.error === 100) {
                    setDisplay404(true)
                }
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
        getData();

    }, [productSlug]);

    return (
        <section className='flex flex-col px-12 py-8 md:mt-60 lg:mt-0'>
            {loading ? (
                <p>Chargement...</p>
            ) : (

                display404 === true ? (
                    <WrongPage/>
                ) : (


                    <div className='flex flex-col'>
                        <div className='flex flex-col md:flex-row'>
                            <div id='images' className='hidden md:block md:w-5/12 shadow-2xl rounded-xl' style={{
                                minHeight: '45vh',
                                maxHeight: '45vh'
                            }}>
                                <img
                                    className='rounded-xl h-full w-full'
                                    style={{
                                        objectFit: 'contain',
                                        objectPosition: '50% 50%'
                                    }}
                                    src={productDetail.images ? productDetail.images[selectedImage] : '../../src/assets/images/Placeholder.jpg'}
                                    alt="Product Image"
                                />
                            </div>
                            <div id='images' className='block md:hidden shadow-2xl rounded-xl'>
                                <img
                                    className='rounded-xl h-full w-full'
                                    style={{
                                        objectFit: 'contain',
                                        objectPosition: '50% 50%'
                                    }}
                                    src={productDetail.images ? productDetail.images[selectedImage] : ''}
                                    alt="Product Image"
                                />
                            </div>
                            <div id="product_info"
                                 className='flex flex-col md:flex-row rounded-xl mt-12 px-4 py-6 md:mt-0 md:ml-12 md:w-7/12 lg:w-8/12 shadow-lg'
                                 style={{
                                     border: '1px solid #4261EE',
                                     background: '#ebebeb',
                                 }}>
                                <div className='flex flex-col justify-between w-full md:w-3/4 lg:w-4/6'>
                                    <h1 className='text-purple text-xl font-bold'>{nommage(productDetail.title, 25)}</h1>
                                    <div className='flex justify-between my-6 lg:my-0 md:flex-col lg:flex-row lg:justify-start'>
                                        {productDetail.images ?
                                            productDetail.images.map((image, index) => (
                                                image && (
                                                    <>
                                                        <div className='flex md:hidden' style={{
                                                            minWidth: '80px',
                                                            minHeight: '80px',
                                                            maxHeight: '80px',
                                                            maxWidth: '80px'
                                                        }}
                                                             onClick={() => {
                                                                 setSelectedImage(index)
                                                             }}>
                                                            <img
                                                                className='rounded-xl'
                                                                style={{
                                                                    objectFit: 'cover',
                                                                    objectPosition: '50% 50%',
                                                                    width: '100%',
                                                                    height: '100%',
                                                                }}
                                                                src={image}
                                                                alt={`Image ${index + 1}`}
                                                            />
                                                        </div>
                                                        <div className='hidden md:flex lg:hidden' style={{
                                                            minWidth: '80px',
                                                            minHeight: '80px',
                                                            maxHeight: '80px',
                                                            maxWidth: '80px',
                                                            margin: '5px 0',
                                                        }}
                                                             onClick={() => {
                                                                 setSelectedImage(index)
                                                             }}>
                                                            <img
                                                                className='rounded-xl'
                                                                style={{
                                                                    objectFit: 'cover',
                                                                    objectPosition: '50% 50%',
                                                                    width: '100%',
                                                                    height: '100%',
                                                                }}
                                                                src={image}
                                                                alt={`Image ${index + 1}`}
                                                            />
                                                        </div>
                                                        <div className='hidden lg:block cursor-pointer' style={{
                                                            minWidth: '100px',
                                                            minHeight: '100px',
                                                            maxHeight: '100px',
                                                            maxWidth: '100px',
                                                            marginRight: '15px'
                                                        }}
                                                             onClick={() => {
                                                                 setSelectedImage(index)
                                                             }}>
                                                            <img
                                                                className='rounded-xl'
                                                                style={{
                                                                    objectFit: 'cover',
                                                                    objectPosition: '50% 50%',
                                                                    width: '100%',
                                                                    height: '100%',
                                                                }}
                                                                src={image}
                                                                alt={`Image ${index + 1}`}
                                                            />
                                                        </div>
                                                    </>
                                                )
                                            )) :
                                            <p className='text-deepPurple'>Aucune image disponible pour se produit</p>}
                                    </div>
                                    <p className='text-purple mt-2 md:mt-0'><b className='underline'>Mise en ligne
                                        :</b> {productDetail.createdDate.split('-').reverse().join('/')}</p>
                                </div>
                                <div
                                    className='flex flex-col justify-between md:justify-start lg:justify-between w-full md:w-3/6 lg:w-2/6'>
                                    <div
                                        className='flex justify-between items-center md:flex-col md:items-end my-4 md:my-0'>
                                        <h1 className='text-purple text-xl font-bold'>{productDetail.price}€</h1>
                                        <div style={{
                                            border: '1px solid #5F70BD',
                                            borderRadius: '5px',
                                            padding: '7px',
                                            cursor: 'pointer'
                                        }} onClick={addProductToCart}>
                                            <p className="text-deepPurple md:text-sm">Ajouter au panier</p>
                                        </div>
                                    </div>
                                    <div className='md:mt-4 lg:mt-0 lg:flex lg:flex-col lg:items-end'>
                                        <p className='text-purple'><b className='underline'>Vendeur
                                            :</b> {productDetail.seller}</p>
                                        <p className='text-purple mt-6'><b className='underline'>Plateforme
                                            :</b> {productDetail.plateform}</p>
                                        <p className='text-purple mt-6'><b className='underline'>Édition
                                            :</b> {productDetail.edition}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="description" className='rounded-xl w-full mt-12 px-4 py-6 shadow-2xl' style={{
                            border: '1px solid #4261EE',
                            background: '#ebebeb',
                            height: '25vh'
                        }}>
                            <h1 className='text-purple text-lg font-bold'>Description du jeu :</h1>
                            <p className='text-lightPurple overflow-y-auto mt-2 mb-4 md:mr-4' style={{
                                height: '120px'
                            }}>{productDetail.productDescription}</p>
                        </div>
                    </div>
                )

            )}
        </section>
    );
}

export default ProductDetail
