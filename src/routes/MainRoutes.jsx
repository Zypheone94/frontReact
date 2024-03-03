// import Pages
import Homepage from "../pages/Homepage.jsx";
import WrongPage from "../pages/WrongPage.jsx";
import Search from "../pages/Search.jsx";

import Legales from "../pages/legal/Legales.jsx";
import Conditions from "../pages/legal/Conditions.jsx";

// Import Components
import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";

const MainRoutes = [
    {
        path: "/",
        element: <> <Header/><Homepage/><Footer/> </>,
        errorElement: <> <Header/><WrongPage/> <Footer/> </>
    },
    {
        path: "/search",
        element: <> <Header/><Search/><Footer/></>
    },
    {
        path: '/legales',
        element: <> <Header/><Legales /><Footer/></>
    },
    {
        path: '/conditions',
        element: <> <Header/><Conditions /><Footer/></>
    }
]

export default MainRoutes