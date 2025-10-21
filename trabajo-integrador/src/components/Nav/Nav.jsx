export const Nav = () => {
    
    return <nav>
        <ul>
            <li>
                <Link to={"/"}>Pagina principal</Link>
            </li>
        </ul>
        <ul>
            <li>
                <Link to={"/category/PS5"}>PS5</Link>
            </li>
        </ul>
        <ul>
            <li>
                <Link to={"/category/Nintendo"}>Nintendo</Link>
            </li>
        </ul>
    </nav>
}