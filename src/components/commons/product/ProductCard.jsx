import DateFormat from "../../../utils/DateFormat.jsx";
import {useNavigate} from "react-router-dom"

import {nommage} from "../../../utils/nommage.jsx";

const ProductCard = ({productValue}) => {

    const navigate = useNavigate()

    return (
        <div className='mx-4 my-4' style={{
            border: '1px solid #4361EE',
            borderRadius: '20px',
            width: '200px',
            height: '300px',
            cursor: 'pointer',
        }} onClick={() => navigate('/product/' + productValue.slug)}>
            <div style={{
                height: '55%'
            }}>
                <img className='h-full w-full'
                     style={{objectFit: 'cover', objectPosition: '50% 50%', borderRadius: '20px 20px 0 0'}}
                     src={productValue.images ? productValue.images[0] : '../../src/assets/images/Placeholder.jpg'}/>
            </div>
            <div className='text-lightPurple p-2 flex flex-col justify-between' style={{
                height: '45%',
                borderTop: '2px solid #4361EE'
            }}>
                <div className='flex justify-between text-deepPurple'>
                    {
                        productValue && productValue.title && (
                            <p className='font-semibold'>{nommage(productValue.title, 12)}</p>
                        )
                    }
                    <p className='font-semibold'>{productValue.price}€</p>
                </div>
                {
                    productValue && productValue.seller && (
                        <p>
                            De: {nommage(productValue.seller, 15)}
                        </p>
                    )
                }

                <p>
                    Mise en ligne : <DateFormat value={productValue.createdDate}/>
                </p>
            </div>
        </div>
    )
}

export default ProductCard