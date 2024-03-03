// Import Pages
import CategoryList from "../pages/categories/CategoryList.jsx";
import CategoryDetail from "../pages/categories/CategoryDetail.jsx";

// Import Components
import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";

const CategoryRoutes = [
    {
        path: "/category",
        element: <><Header/> <CategoryList/> <Footer/></>,
    },
    {
        path: "/category/:slug",
        element: <><Header/> <CategoryDetail/> <Footer/></>,
    },
];

export default CategoryRoutes;