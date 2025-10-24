import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList.jsx";

export const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const { platform } = useParams(); 

    useEffect(() => {
        fetch("/data/products.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al buscar productos");
                }
                return res.json();
            })
            .then((data) => {
                if (platform) {
                    const filtered = data.filter((prod) => prod.platform.includes(platform));
                    setProducts(filtered);
                } else {
                    setProducts(data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [platform]); 

    return (
        <section className="product-section">
            <h1>{platform ? `Platform: ${platform}` : "Lanzamientos recientes"}</h1>
            <div className="product-grid">
                <ItemList list={products} />
            </div>
        </section>
    );
};
