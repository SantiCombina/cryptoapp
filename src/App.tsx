import {Route, Routes} from "react-router-dom";
import {Layout} from "antd";

import "./App.css";
import {Homepage} from "./views/homepage";
// import {Exchanges} from "./views/exchanges";
import {Cryptocurrencies} from "./views/cryptocurrencies";
import {CryptoDetails} from "./views/crypto-details";
import {News} from "./views/news";
import Navbar from "./components/navbar";
import {Footer} from "./components/footer";

function App() {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route element={<Homepage />} path="/" />
                            {/* <Route element={<Exchanges />} path="/exchanges" /> */}
                            <Route element={<Cryptocurrencies />} path="/cryptocurrencies" />
                            <Route element={<CryptoDetails />} path="/crypto/:coinId" />
                            <Route element={<News />} path="/news" />
                        </Routes>
                    </div>
                </Layout>
                <footer className="footer" style={{color: "white"}}>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}

export default App;
