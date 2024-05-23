import {Link} from "react-router-dom";
import {Typography, Space} from "antd";

export function Footer() {
    return (
        <>
            <Typography.Title level={5} style={{color: "white", textAlign: "center"}}>
                Cryptoverse <br />
                All rights reserved.
            </Typography.Title>
            <Space>
                <Link to="/">Home</Link>
                <Link to="/exchanges">Exchanges</Link>
                <Link to="/news">News</Link>
            </Space>
        </>
    );
}
