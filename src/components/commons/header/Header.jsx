// import images
import logo from '../../../assets/images/logo.png'
import Logout from '../../../assets/images/icons/Logout.jsx'
import User from '../../../assets/images/icons/User.jsx'
import Main from '../../../assets/images/banner/main.jpg'
import Cart from '../../../assets/images/icons/Cart.jsx'

//import component
import SearchBar from "../searchbar/SearchBar.jsx";

import {useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
import {useEffect} from "react";

function Header() {

    const navigate = useNavigate()
    const locate = useLocation()

    const user = useSelector(state => state.user)
    const redirection = () => {
        if (user === null) {
            navigate('/login')
        } else {
            navigate('/profile')
        }
    }

    const disconnect = () => {
        navigate('/logout')
    }

    const style = {
        borderBottom: '2px solid #7029b7',
    };

    if (window.innerWidth <= 768) {
        style.borderBottom = 'none';
    }

    return (
        <>
            <header className='
                lg:flex lg:items-center lg:h-28 lg:px-12 lg:relative lg:flex-row
                py-8 md:bg-white md:flex md:flex-col md:justify-center md:items-center md:w-full
                fixed top-0 bg-white flex flex-col w-full items-center z-50'
                    style={style}>
                <div className="lg:w-4/12 lg:pb-0 md:pb-4">
                    <img src={logo} alt="Logo Gam'In-Spot"
                         className='lg:w-56 md:w-44 md:object-contain md:block hidden cursor-pointer'
                         id='logo' onClick={() => navigate('/')}/>
                </div>
                <div className="
                lg:flex lg:w-3/12 lg:justify-center lg:pb-0
                md:pb-4">
                    <SearchBar/>
                </div>
                <div className='flex mt-6 md:mt-0  lg:w-5/12 lg:justify-center'>
                    {user === null || user.username === undefined ? (
                        <></>
                    ) : (
                        <div style={{
                            border: '1px solid silver',
                            borderRadius: '5px',
                            padding: '7px',
                            cursor: 'pointer'
                        }} onClick={() => navigate('/product-management/create')}>
                            <p className="text-purple">Ajouter article +</p>
                        </div>
                    )
                    }
                    <div className="lg:w-4/12 flex items-center justify-between" style={{
                        marginLeft: user !== null && user.email !== undefined ? '40px' : ''
                    }}>
                        <div onClick={redirection}>
                            <User/>
                        </div>
                        <p className='text-purple font-[Poppins] cursor-pointer hidden md:block'
                           onClick={redirection}>
                            {user && user.username ? user.username : "Mon compte"}
                        </p>
                        <div onClick={() => {
                            navigate('/cart')
                        }}>
                            <Cart/>
                        </div>

                        {user === null || user.username === undefined ? (
                            <></>
                        ) : (
                            <div onClick={disconnect}><Logout/></div>
                        )}
                    </div>
                </div>

            </header>
            <div className='my-8 h-36 md:hidden'></div>
            {locate.pathname === '/profile' || locate.pathname.includes('/product') ? (
                <></>
            ) : (
                <div className="lg:mt-0 md:block md:mt-32 hidden" id="mainBanner" style={{
                    background: `url(${Main})`,
                    height: '250px',
                    backgroundPosition: '50% 100%',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed'
                }}></div>
            )}
        </>
    );
}

export default Header
