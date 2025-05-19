import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUp from "./pages/signUp/SignUp";
import LogIn from "./pages/logIn/LogIn";
import Sidebar from "./component/sidebar/Sidebar";
import Footer from "./component/footer/Footer";
import Home from "./pages/home/Home";
import ProductList from "./pages/productList/ProductList";
import ProductDetail from "./pages/productList/ProductDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Favorites from "./pages/favorites/Favorites";
import ProductCreate from "./pages/ProductCreate/ProductCreate";
import ChatAi from "./pages/ai/ChatAi";
import NotFoundPage from "./component/404/NotFoundPage";
import Navbar from "./component/navbar/Navbar"; 
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <Router>
      <Navbar /> 
      <div style={{ display: 'flex' }}> 
        <Sidebar />
        <div style={{ flexGrow: 1 }}> 
          <Routes>
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/productList" exact element={<ProductList />} />
            <Route path="/product/:id" exact element={<ProductDetail />} />
            <Route path="/cartpage" exact element={<Cart />} />
            <Route path="/favorites" exact element={<Favorites />} />
            <Route path="/productCreate" exact element={<ProductCreate />} />
            <Route path="/ai" exact element={<ChatAi />} />
            <Route path="/profile" exact element={<Profile />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;