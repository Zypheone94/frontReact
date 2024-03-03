//import CategoryList from "./components/categories/CategoryList.jsx";
//import ProductList from "./components/products/ProductList.jsx";
//import ProductDetail from "./components/products/ProductDetail.jsx";
//import CategoryDetail from "./components/categories/CategoryDetail.jsx";
import ProductCard from "../components/commons/product/ProductCard.jsx";
import {api} from "../utils/api.jsx";
import React, {useEffect, useState} from "react";
import CategoryCard from "../components/commons/product/CategoryCard.jsx";

import {useNavigate} from "react-router-dom"

function Homepage() {

    const navigate = useNavigate()

    const [productList, setProductList] = useState()
    const [categoryList, setCategoryList] = useState()
    const [categoryStar, setCategoryStar] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProductList();
        getData();
    }, []);

    useEffect(() => {
        if (categoryList && categoryList.length > 0) {
            while (categoryStar.length < 5) {
                const randomIndex = Math.floor(Math.random() * categoryList.length);
                const randomCategory = categoryList[randomIndex];
                if (!categoryStar.includes(randomCategory)) {
                    categoryStar.push(randomCategory);
                }
            }
        }
    }, [categoryList]);


    const getData = async () => {
        function getSearchParam() {
            const params = new URLSearchParams(window.location.search);
            return params.get('search') || '';
        }

        try {
            let url = '/products/api/category'
            getSearchParam() !== null ?
                url += `/?search=${getSearchParam()}` : null
            const response = await api(url);
            let orderValue = response.sort()
            setCategoryList(orderValue);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }

    const getProductList = async () => {
        try {
            const response = await api('products/product/loadProductList', 'POST', {'limit': 15});
            console.log(response)
            setProductList(response)
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    }

    return (
        <div>
            <div className='flex flex-col'>
                <div className='flex items-center mt-4 mb-10'>
                    <h1 className='text-pink text-xl ml-8 '>Catégories en vedette</h1>
                    <p className='text-pink cursor-pointer flex justify-center ml-4' style={{
                        border: '1px solid #F72585',
                        borderRadius: '20px',
                        width: '26px',
                        height: '26px'
                    }}
                       onClick={() => navigate('/category')}>+</p>
                </div>
                <div className='flex flex-wrap'>
                    {
                        categoryStar && categoryStar.map((categorie, index) =>
                            (
                                index < 5 &&
                                <div className='flex justify-center w-1/2 md:w-1/3 lg:w-1/5'>
                                    <CategoryCard categorySlug={categorie.slug} categoryTitle={categorie.title}/>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            <div className='flex flex-col'>
                <h1 className='text-pink text-xl mt-4 ml-8 mb-10'>Produits en vedette</h1>
                <div className='flex flex-wrap'>
                    {
                        productList && productList.map((product) =>
                            (
                                <div className='flex justify-center w-1/2 md:w-1/3 lg:w-1/5'>
                                    <ProductCard productValue={product}/>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Homepage
