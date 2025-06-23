import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import SignUp from "./pages/signUp/SignUp";
import LogIn from "./pages/logIn/LogIn";
import Sidebar from "./component/sidebar/Sidebar";
import Footer from "./component/footer/Footer";
import Home from "./pages/home/Home";
import ProductList from "./pages/productList/ProductList";
import Cart from "./pages/cart/Cart";
import Favorites from "./pages/favorites/Favorites";
import ProductCreate from "./pages/ProductCreate/ProductCreate";
import ChatAi from "./pages/ai/ChatAi";
import NotFoundPage from "./component/404/NotFoundPage";
import Navbar from "./component/navbar/Navbar";
import Profile from "./pages/profile/Profile";
import ProductDetail from "./pages/productList/ProductDetails";
import FilteredProductByCategory from "./pages/productList/FilteredProductByCategory";
import ContactUs from "./pages/contactUs/ContactUs";
import AboutUs from "./pages/aboutUs/AboutUs";

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <div
          style={{
            display: "flex",
            flexGrow: 1,
            backgroundColor: "#f4f6f8",
          }}
        >
          <Sidebar onCategorySelect={setSelectedCategoryId} />

          <main
            style={{
              flexGrow: 1,
              padding: "24px",
              paddingTop: 64, // Navbar yüksekliği kadar boşluk
              overflowY: "auto",
            }}
          >
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/logIn" element={<LogIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/productList" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cartpage" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/productCreate" element={<ProductCreate />} />
              <Route path="/ai" element={<ChatAi />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/filteredProductsByCategory"
                element={
                  <FilteredProductByCategory
                    selectedCategoryId={selectedCategoryId}
                  />
                }
              />
              <Route path="/contactUs" element={<ContactUs/> }/>
              <Route path="/aboutUs" element={<AboutUs/> }/>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
