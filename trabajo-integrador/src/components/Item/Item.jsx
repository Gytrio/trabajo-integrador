import "./Item.css";

export const Item = ({ name, price, description, imageUrl, children }) => {
    return (
        <article className="product-item">
            <img src={imageUrl} alt={description} />
            <h2 className="product-title">{name}</h2>
            <p>Precio: {price}</p>
            <p>Descripción: {description}</p>
            {children}
        </article>
    );
};
