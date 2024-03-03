import React, {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";
import Selector from "../commons/Selector.jsx";

import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const ModifyProductForm = ({productDetail, setProductDetail, slug}) => {

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [categoryDetailList, setCategoryDetailList] = useState([])
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState([])
    const [selectedValue, setSelectedValue] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [returnError, setReturnError] = useState('')

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login');
        }

        setIsLoading(true);

        api('products/product/loadcat', "POST")
            .then(response => {
                setCategoryDetailList(response)
                const categories = response.map(category => category.title);
                categories.sort()
                setCategoryList(categories);

                if (productDetail?.category?.length > 0) {
                    const updatedValues = productDetail.category.map(id => {
                        const matchedCategory = response.find(category => category.categoryId === id);
                        return matchedCategory ? matchedCategory.title : null;
                    }).filter(Boolean);

                    setSelectedValue(updatedValues);
                }
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [user, navigate]);

    useEffect(() => {
        const selectedCat = selectedValue.map((val) => {
            console.log(selectedValue)
            console.log(categoryDetailList)
            const selectedCategory = categoryDetailList.find((cat) => val === cat.title);
            return selectedCategory ? selectedCategory.categoryId : null;
        });

        setCategory(selectedCat.filter((category) => category !== null));

    }, [selectedValue]);

    const handleInputChange = (e) => {
        const {name, value, type} = e.target;
        if (type === "file") {
            const files = e.target.files;
            const filesArray = Array.from(files);

            if (filesArray.length > 3) {
                setReturnError('Vous ne pouvez pas envoyer plus de 3 photos.');
            } else {
                setProductDetail({...productDetail, ['images']: filesArray});
                setReturnError('');
                console.log("files:", filesArray);
            }
        } else {
            const {value} = e.target;
            setProductDetail({...productDetail, [name]: value});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await api(`products/product/modify/${slug}`, 'PUT', productDetail);
        console.log(response)
        if (category.length > 0) {
            let reqValues = {'product_id': productDetail.productId, 'category_ids': category}
            const req = await api('products/product/add-categories', 'POST', reqValues)
            console.log(req)
            if (req.code === 200) {
                navigate('/product/' + slug)
            }
        } else {
            if (response.code === 200) {
                navigate('/product/' + slug)
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col mx-4">

                <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Titre</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Titre"
                        required
                        value={productDetail?.title}
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Plateforme</label>
                    <input
                        type="text"
                        name="plateform"
                        placeholder="Plateforme"
                        required
                        value={productDetail?.plateform}
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Description</label>
                    <textarea
                        name="productDescription"
                        placeholder="Description"
                        required
                        value={productDetail?.productDescription}
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Prix</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Prix"
                        required
                        value={productDetail?.price}
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Édition</label>
                    <input
                        type="text"
                        name="edition"
                        placeholder="Édition"
                        value={productDetail?.edition}
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className='flex justify-between mt-8 md:mx-14 md:justify-around md:mt-12'>
                    <div className='w-1/2 md:w-1/4'>
                        {!isLoading ? (
                            <div style={{
                                minWidth: '200px',
                                minHeight: '30px',
                                position: 'relative'
                            }}>
                                <Selector selectorList={categoryList} setValue={setSelectedValue} value={selectedValue}
                                          multiple isSearch disable={selectedValue.length === 4}/>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div
                        className='w-1/2 flex flex-col justify-end md:flex-wrap md:mx-8 md:w-3/4 md:flex-row lg:flex-nowrap lg:mx-2'>
                        {!isLoading ? (
                            selectedValue && selectedValue.length > 0 ? (
                                selectedValue.map((value, index) => (
                                    <div className='flex px-4' key={index}>
                                        <p
                                            style={{color: 'red', cursor: 'pointer'}}
                                            onClick={() => {
                                                let updateValue = [...selectedValue];
                                                updateValue.splice(index, 1);
                                                setSelectedValue(updateValue);
                                            }}
                                        >
                                            X
                                        </p>
                                        <p className='ml-2' key={index}>
                                            {value}
                                        </p>
                                    </div>
                                ))
                            ) : <p>Vous n'avez sélectionné aucune catégorie</p>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                </div>

                {
                    returnError ? (
                        <p style={{color: 'red', marginTop: '20px'}}>{returnError}</p>
                    ) : (
                        <></>
                    )
                }

                <div className="text-right">
                    <button type="submit" className="hover:text-pink mt-12 mb-20"
                            disabled={returnError !== ''}
                            style={{
                                color: returnError !== '' ? 'grey' : ''
                            }}>
                        Modifier l'annonce
                    </button>
                </div>

            </form>
        </>
    )
}

export default ModifyProductForm