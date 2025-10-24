import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"; // <-- FALTABA
import { Nav } from "./components/Nav/Nav.jsx";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer.jsx";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import { CartProvider } from "./Context/CartContext/CartProvider.jsx";
function App() {

  return (
    <>
        <BrowserRouter>
            <CartProvider>
                
            <Nav/>
            <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/category/:platform" element={<ItemListContainer />} />
                <Route path="/details/:id" element={<ItemDetailContainer />} />
            </Routes>
            </CartProvider>

        </BrowserRouter>
    </>
  )
}

export default App
