import DateFormat from "../../../utils/DateFormat.jsx";
import {useNavigate} from "react-router-dom"

import {nommage} from "../../../utils/nommage.jsx";

const HistoryCard = ({productValue}) => {

    const navigate = useNavigate()

    return (
        <div className='w-full mt-6 h-20 lg:h-32' style={{
            border: '1px solid #4361EE',
            borderRadius: '20px',
            cursor: 'pointer',
        }} onClick={() => navigate('/product/' + productValue.slug)}>

            <div className='text-lightPurple flex h-full'>
                <div className='w-1/4 md:w-3/5' style={{
                    clipPath: 'polygon(0px 0px, -0.63% 196.25%, 100% 0px)',
                }}>
                    <div className='w-full h-full'
                         style={{
                             borderRadius: '20px 0 20px 20px',
                             backgroundPosition: 'center',
                             backgroundSize: 'cover',
                             backgroundImage: productValue.images ? `url(${productValue.images[0]})` : 'url(../../src/assets/images/Placeholder.jpg)'
                         }}>
                    </div>
                </div>


                <div className='flex justify-between items-center w-full p-2 lg:ml-16'>
                    <p className='hidden md:block font-semibold text-deepPurple flex-1 text-center'>{nommage(productValue.title, 18)}</p>
                    <p className='md:hidden font-semibold text-deepPurple flex-1 text-center'>{nommage(productValue.title, 12)}</p>
                    <p className='font-semibold text-deepPurple flex-1 text-center'>{productValue.price}€</p>
                    <p className='flex-1 text-center'>
                        Mise en ligne : <DateFormat value={productValue.createdDate}/>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default HistoryCard