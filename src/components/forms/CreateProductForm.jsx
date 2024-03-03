import React, {useState, useEffect} from "react";
import {apiFile} from "../../utils/apiFile.jsx";
import {api} from "../../utils/api.jsx";
import Selector from "../commons/Selector.jsx";

import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const CreateProductForm = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [categoryDetailList, setCategoryDetailList] = useState()
    const [categoryList, setCategoryList] = useState([])
    const [selectedValue, setSelectedValue] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        }
        setIsLoading(true)
        api('products/product/loadcat', "POST")
            .then(response => {
                response.forEach((value) => {
                    if (!categoryList.includes(value.title)) {
                        categoryList.push(value.title)
                    }
                })
                let order = [...categoryList]
                order.sort()
                setCategoryList(order)
                setCategoryDetailList(response)
                setIsLoading(false)
                console.log(categoryList)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        const selectedCat = selectedValue.map((val) => {
            const selectedCategory = categoryDetailList.find((cat) => val === cat.title);
            return selectedCategory ? selectedCategory.categoryId : null;
        });

        setCategory(selectedCat.filter((category) => category !== null));

        console.log(category);
    }, [selectedValue]);

    const [formValue, setFormValue] = useState({
        seller_id: user.id,
        title: "",
        plateform: "",
        productDescription: "",
        price: "",
        edition: "Normale",
        images: [],
    })
    const [category, setCategory] = useState([])
    const [returnError, setReturnError] = useState('')

    const handleInputChange = (e) => {
        const {name, value, type} = e.target;
        if (type === "file") {
            const files = e.target.files;
            const filesArray = Array.from(files);

            if (filesArray.length > 3) {
                setReturnError('Vous ne pouvez pas envoyer plus de 3 photos.');
            } else {
                setFormValue({...formValue, ['images']: filesArray});
                setReturnError('');
                console.log("files:", filesArray);
            }
        } else {
            const {value} = e.target;
            setFormValue({...formValue, [name]: value});
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await apiFile('products/product/create', formValue);
        console.log(response)
        if (category.length > 0) {
            let reqValues = {'product_id': response.data.productId, 'category_ids': category}
            const req = await api('products/product/add-categories', 'POST', reqValues)
            console.log(req)
            if (req.code === 200) {
                navigate('/product/' + response.data.slug)
            }
        } else {
            if (response.code === 200) {
                navigate('/product/' + response.data.slug)
            }
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col">

                <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Titre</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Titre"
                        required
                        value={formValue?.title}
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
                        value={formValue?.plateform}
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
                    <input
                        type="text"
                        name="productDescription"
                        placeholder="Description"
                        required
                        value={formValue?.productDescription}
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
                        value={formValue?.price}
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
                        value={formValue?.edition}
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 items-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Photo de votre article</label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        accept=".jpg, .jpeg, .png"
                        max="3"
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
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
                        {
                            selectedValue && selectedValue.length > 0 ? (
                                selectedValue.map((value, index) => (
                                    <div className='flex px-4'>
                                        <p style={{color: 'red', cursor: 'pointer'}} onClick={() => {
                                            let updateValue = [...selectedValue]
                                            updateValue.splice(index, 1);
                                            setSelectedValue(updateValue)
                                        }}>X</p>
                                        <p key={index} className='ml-2'>{value}</p>
                                    </div>
                                ))
                            ) : <p>Vous n'avez séléctionné(e) aucune catégorie</p>
                        }
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
                        Mettre en ligne l'annonce
                    </button>
                </div>

            </form>
        </>
    )
}

export default CreateProductForm