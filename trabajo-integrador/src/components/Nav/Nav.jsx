import { Link } from "react-router-dom";
import "./Nav.css";
import { useCartContext } from "../../Context/CartContext/useCartContext";

export const Nav = () => {
    const { getTotalItems } = useCartContext();

    return (
        <nav>
            <ul>
                <li><Link to="/">Pagina principal</Link></li>
                <li><Link to="/category/PS5">PS5</Link></li>
                <li><Link to="/category/Switch">Switch</Link></li>
                <li style={{ position: "relative" }}>
                    <Link to="/cart">Carrito</Link>
                    {getTotalItems() > 0 && (
                        <span className="in-cart">{getTotalItems()}</span>
                    )}
                </li>
            </ul>
        </nav>
    );
};
