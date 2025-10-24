import { useCartContext } from "../../Context/CartContext/useCartContext.js";
import { Item } from "../Item/Item.jsx";
export const ItemDetail = ({detail}) => {
    
    const {addItem} = useCartContext();
    
    return (
        <Item {...detail}>
            <button onClick ={() => addItem(detail)}> Enviar al carrito</button>
        </Item>
            
    );
};