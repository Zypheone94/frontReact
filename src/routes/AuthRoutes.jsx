// Import Pages
import Login from "../pages/user/Login.jsx";
import Logout from "../pages/user/Logout.jsx";

// Import Components
import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";
import Profile from "../pages/user/Profile.jsx";
import ModifyUser from "../pages/user/ModifyUser.jsx";
import CreateUser from "../pages/user/CreateUser.jsx";
import DeleteUser from "../pages/user/DeleteUser.jsx";
import HistoryUser from "../pages/user/HistoryUser.jsx";

const AuthRoutes = [
    {
        path: "/login",
        element: <><Header/><Login/><Footer/></>,
    },
    {
        path: "/logout",
        element: <Logout/>,
    },
    {
        path: "/create",
        element: <><Header/><CreateUser/><Footer/></>
    },
    {
        path: '/profile',
        element: <><Header/><Profile/></>
    },
    {
        path: '/profile/modify/data',
        element: <><Header/><ModifyUser/></>
    },
    {
        path: '/profile/modify/mail',
        element: <><Header/><ModifyUser/></>
    },
    {
        path: '/profile/modify/password',
        element: <><Header/><ModifyUser/></>
    },
    {
        path: '/profile/delete',
        element: <><Header/><DeleteUser/></>
    },
    {
        path: '/profile/list',
        element: <><Header/><HistoryUser/></>
    }
]

export default AuthRoutes