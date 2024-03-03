import Cart from "../pages/cart/Cart.jsx";

import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";
import Success from "../stripe/Success.jsx";
import Failure from "../stripe/Failure.jsx";

const PaymentRoutes = [
    {
        path: '/cart',
        element: <> <Header/><Cart/><Footer/> </>,
    },
    {
        path: '/paiement/success',
        element: <><Header/><Success/><Footer/></>
    },
    {
        path: '/paiement/failure',
        element: <><Header/><Failure/><Footer/></>
    }
]

export default PaymentRoutes