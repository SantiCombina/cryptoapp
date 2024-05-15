import {Route, Link, Routes} from "react-router-dom";
import {Layout, Typography, Space} from "antd";

import "./App.css";
import {Homepage} from "./views/homepage";
import {Exchanges} from "./views/exchanges";
import {Cryptocurrencies} from "./views/cryptocurrencies";
import {CryptoDetails} from "./views/crypto-details";
import {News} from "./views/news";
import Navbar from "./components/navbar";

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
                            <Route element={<Exchanges />} path="/exchanges" />
                            <Route element={<Cryptocurrencies />} path="/cryptocurrencies" />
                            <Route element={<CryptoDetails />} path="/crypto/:coinId" />
                            <Route element={<News />} path="/news" />
                        </Routes>
                    </div>
                </Layout>
                <div className="footer" style={{color: "white", textAlign: "center"}}>
                    <Typography.Title>
                        Cryptoverse <br />
                        All rights reserved.
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/exchanges">Exchanges</Link>
                        <Link to="/news">News</Link>
                    </Space>
                </div>
            </div>
        </div>
    );
}

export default App;
