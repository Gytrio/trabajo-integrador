import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav/Nav.jsx";
import Layout from "./components/Layout/Layout.jsx";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer.jsx";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import { CartProvider } from "./Context/CartContext/CartProvider.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <Nav />
                <Routes>
                        <Route element={<Layout />}>
                        <Route path="/" element={<ItemListContainer />} />
                        <Route path="/category/:platform" element={<ItemListContainer />} />
                        <Route path="/details/:id" element={<ItemDetailContainer />} />
                    </Route>
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}