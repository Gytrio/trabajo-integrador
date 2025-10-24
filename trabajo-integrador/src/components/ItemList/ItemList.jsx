import { Link } from "react-router-dom";
import { Item } from "../Item/Item.jsx";
import { useCartContext } from "../../Context/CartContext/useCartContext";

export const ItemList = ({ list }) => {
    const { addItem } = useCartContext();

    return (
        <>
            {list.length ? (
                list.map((product) => (
                    <Item key={product.id} {...product}>
                        <div className="product-actions">
                            <button
                                className="btn-add"
                                onClick={() => addItem(product)}
                            >
                                Enviar al carrito
                            </button>
                        </div>
                    </Item>
                ))
            ) : (
                <p>No hay productos</p>
            )}
        </>
    );
};

