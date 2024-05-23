import {Button, Menu, Typography, Avatar} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

import icon from "../images/cryptocurrency.png";

export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (screenSize !== null) {
            if (screenSize < 768) {
                setActiveMenu(false);
            } else {
                setActiveMenu(true);
            }
        }
    }, [screenSize]);

    const menuItems = [
        {
            key: "home",
            icon: <HomeOutlined />,
            label: <Link to="/">Home</Link>,
        },
        {
            key: "cryptocurrencies",
            icon: <FundOutlined />,
            label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
        },
        {
            key: "exchanges",
            icon: <MoneyCollectOutlined />,
            label: <Link to="/exchanges">Exchanges</Link>,
        },
        {
            key: "news",
            icon: <BulbOutlined />,
            label: <Link to="/news">News</Link>,
        },
    ];

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar size="large" src={icon} />
                <Typography.Title className="logo" level={2}>
                    <Link to="/">CryptoVerse</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && <Menu items={menuItems} theme="dark" />}
        </div>
    );
}
