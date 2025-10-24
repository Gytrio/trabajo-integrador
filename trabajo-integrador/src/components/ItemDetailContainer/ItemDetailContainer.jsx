import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail.jsx";

export const ItemDetailContainer = () => {
    const [detail, setDetail] = useState(null);
    const {id} = userParams();
    
    useEffect(() => {
        fetch("/data/products.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error buscar productos");
                }
                return res.json();
            })
            .then((data) => {
                const found = data.find((product) = product => product.id === Number(id));
                if (found) {
                    setDetail(found);
                }
                else
                {
                    throw new Error("No se encontro productos" );
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id]);
    return (
        <main>
        {Object.keys(detail).length ? (<ItemDetail detail = {detail}/>):(<p>Cargando...</p>)}
        </main>
    )
}