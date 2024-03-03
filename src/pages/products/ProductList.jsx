import {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";
import {Link} from "react-router-dom";

function ProductList() {

    const [productList, setProductList] = useState([])
    // State qui va contenir ma liste de produit
    const [loading, setLoading] = useState(true)
    // State qui va permettre de savoir si les données de l'api sont en cours de récupération

    useEffect(() => {
        const getData = async () => {
            function getSearchParam() {
                const params = new URLSearchParams(window.location.search);
                return params.get('search') || '';
            }

            try {
                let url = '/products/api/product'
                getSearchParam() !== null ?
                    url += `/?search=${getSearchParam()}` : null
                const response = await api(url);
                setProductList(response);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        getData();
    }, []);

    return (
        <div>
            <h1>Liste des produits</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <ul>
                    {productList !== null ? productList.map(product => (
                        <li key={product.productId}>
                            <Link to={`/product/${product.productId}`}>{product.title}</Link>
                        </li>
                    )) : <p>Votre recherche n'a rien donnée malheureusement </p>}
                </ul>
            )}
        </div>
    );
}

export default ProductList
