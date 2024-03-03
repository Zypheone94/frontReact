import ProductList from "../pages/products/ProductList.jsx";
import ProductDetail from "../pages/products/ProductDetail.jsx";
import CreateProduct from "../pages/products/CreateProduct.jsx";
import ModifyProduct from "../pages/products/ModifyProduct.jsx";

// Import Components
import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";

const ProductRoutes = [
    {
        path: "/product",
        element: <><Header/> <ProductList/> <Footer/></>,
    },
    {
        path: "/product/:productId",
        element: <><Header/> <ProductDetail/> <Footer/></>,
    },
    {
        path: "/product/modify/:productId",
        element: <><Header/> <ModifyProduct/> <Footer/></>
    },
    {
        path: "/product-management/create",
        element: <><Header/> <CreateProduct/> <Footer/></>,
    },
]

export default ProductRoutes