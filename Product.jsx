import React, { useEffect, useState } from 'react'
import Axios from "axios"
import { ToastContainer, toast } from "react-toastify";


let api = " https://6791d3c6cf994cc680478f00.mockapi.io/Products";

function Product() {

    const [productlist, setProductlist] = useState([]);
    const [newProduct, setNewProduct] = useState({
        productTitle: "",
        productDescription: "",
        productPrice: "",
    })

    // Add Product
    const addProduct = async () => {
        try {
            await Axios.post(api, newProduct)
            setNewProduct({
                productTitle: "",
                productDescription: "",
                productPrice: "",
            })
            toast.success("Product Added Successfully😎")

        }
        catch (error) {
            toast.error("Error in Adding Product")
            console.log(error);

        }


    };

    //  fetch data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response = await Axios.get(api);

                if (response.data.length === 0) {
                    toast.info("No Product Found")
                }
                setProductlist(response.data);

            } catch (error) {

                toast.error("error in fetching Products")
                console.log(error);

            }
        };
        fetchProducts();
    }, []);

    return (


        <div>

            <h1>My Product Application</h1>
            {/* add new Product */}
            <div >

                <h2>Add New Product</h2>
                <input
                    type='text'
                    placeholder='Enter Product Title'
                    value={newProduct.productTitle}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, productTitle: e.target.value })
                    }
                />
                <textarea>
                    <input
                        type='text'
                        placeholder='Enter Product Description'
                        value={newProduct.productDescription}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, productDescription: e.target.value })}

                    />
                </textarea>
                <input
                    type='number'
                    placeholder='Enter Product price'
                    value={newProduct.productPrice}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, productPrice: e.target.value })}

                />

                <button onClick={addProduct}>Add Product</button>

                <ToastContainer />

            </div>

            {/* fetch product */}
            {productlist.length > 0 ? (
                <ul>
                    {productlist.map((product) => (
                        <li key={product.id}>
                            <h3>{product.productTitle}</h3>
                            <p>{product.productDescription}</p>
                            <p><b>{product.productPrice}</b></p>


                        </li>
                    ))}
                </ul>
            ) : (
                <h2 style={{ textAlign: "center", marginTop: "25px", color: "red" }}>
                    No Product Found
                </h2>

            )
            }

        </div>
    );


}


export default Product