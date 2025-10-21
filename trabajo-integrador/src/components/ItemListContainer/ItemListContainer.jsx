import {useEffect, useState} from "react";
import {data} from "react-router";

export const ItemListContainer = () => {
    
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch("/data/products.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error buscar productos");
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data)
            })
            .catch((error) => {
                console.log(error);
            })
    })
    
    return <section>
        <h1>Bienvenida</h1>
        
    </section>
}