import millify from "millify";
import {Typography, Row, Col, Statistic} from "antd";
import {Link} from "react-router-dom";

import {useGetCryptosQuery} from "../services/crypto-api";

import {Cryptocurrencies} from "./cryptocurrencies";
import {News} from "./news";

import {Loader} from "@/components/loader";

export function Homepage() {
    const {data, isFetching} = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;
    const Title = Typography.Title;

    if (isFetching) return <Loader />;

    return (
        <>
            <Title className="heading" level={2}>
                Global Crypto Stats
            </Title>
            {globalStats && (
                <Row>
                    <Col span={12}>
                        <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
                        <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
                        <Statistic title="Total Market Cap" value={millify(Number(globalStats.totalMarketCap))} />
                        <Statistic title="Total 24h Volume" value={millify(Number(globalStats.total24hVolume))} />
                        <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
                    </Col>
                </Row>
            )}
            <div className="home-heading-container">
                <Title className="home-title" level={2}>
                    Top 10 Cryptos in the world
                </Title>
                <Title className="show-more" level={3}>
                    <Link to="/cryptocurrencies">Show more</Link>
                </Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title className="home-title" level={2}>
                    Latest Crypto News
                </Title>
                <Title className="show-more" level={3}>
                    <Link to="/news">Show more</Link>
                </Title>
            </div>
            <News simplified />
        </>
    );
}
