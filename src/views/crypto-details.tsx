import HTMLReactParser from "html-react-parser";
import {useParams} from "react-router-dom";
import millify from "millify";
import {Col, Row, Typography, Select} from "antd";
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckCircleOutlined,
    NumberOutlined,
} from "@ant-design/icons";
import {useState} from "react";

import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from "@/services/crypto-api";
import {Loader} from "@/components/loader";
import {LineChartGraph} from "@/components/line-chart-graph";

const {Title, Text} = Typography;
const {Option} = Select;

const safeMillify = (value: number | string) => {
    const num = Number(value);

    return isNaN(num) ? "-" : millify(num);
};

export function CryptoDetails() {
    const [timePeriod, setTimePeriod] = useState("7d");

    const {coinId} = useParams();
    const {data, isFetching} = useGetCryptoDetailsQuery(coinId ? coinId : "");
    const {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod});

    const cryptoDetail = data?.data?.coin;

    if (isFetching) return <Loader />;

    const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

    const stats = [
        {
            title: "Price to USD",
            value: cryptoDetail?.price ? safeMillify(cryptoDetail.price) : "-",
            icon: <DollarCircleOutlined />,
        },
        {title: "Rank", value: cryptoDetail?.rank || "-", icon: <NumberOutlined />},
        {
            title: "24h Volume",
            value: cryptoDetail?.["24hVolume"] ? safeMillify(cryptoDetail["24hVolume"]) : "-",
            icon: <FundOutlined />,
        },
        {
            title: "Market Cap",
            value: cryptoDetail?.marketCap ? safeMillify(cryptoDetail.marketCap) : "-",
            icon: <DollarCircleOutlined />,
        },
        {
            title: "All-time-high(daily avg.)",
            value: cryptoDetail?.allTimeHigh?.price ? safeMillify(cryptoDetail.allTimeHigh.price) : "-",
            icon: <TrophyOutlined />,
        },
    ];

    const genericStats = [
        {title: "Number Of Markets", value: cryptoDetail?.numberOfMarkets || "-", icon: <FundOutlined />},
        {title: "Number Of Exchanges", value: cryptoDetail?.numberOfExchanges || "-", icon: <MoneyCollectOutlined />},
        {
            title: "Aprroved Supply",
            value: cryptoDetail?.supply.confirmed ? <CheckCircleOutlined /> : <StopOutlined />,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Total Supply",
            value: cryptoDetail?.supply.total ? safeMillify(cryptoDetail.supply.total) : "-",
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Circulating Supply",
            value: cryptoDetail?.supply.supplyAt ? safeMillify(cryptoDetail.supply.supplyAt) : "-",
            icon: <ExclamationCircleOutlined />,
        },
    ];

    return (
        <>
            <Col className="coin-detail-container">
                {cryptoDetail ? (
                    <>
                        <Col className="coin-heading-container">
                            <Title className="coin-name" level={2}>
                                {cryptoDetail?.name} ({cryptoDetail?.symbol}) Price
                            </Title>
                            <p>
                                {cryptoDetail?.name} live price in US dollars. View value statistics, market cap and
                                supply.
                            </p>
                        </Col>
                        <LineChartGraph
                            coinHistory={coinHistory}
                            coinName={cryptoDetail.name}
                            currentPrice={cryptoDetail?.price ? safeMillify(cryptoDetail.price) : "-"}
                        />
                        <Select
                            className="select-timeperiod"
                            defaultValue="7d"
                            placeholder="Select Time Period"
                            onChange={(value) => setTimePeriod(value)}
                        >
                            {time.map((date) => (
                                <Option key={date}>{date}</Option>
                            ))}
                        </Select>
                        <Col className="stats-container">
                            <Col className="coin-value-statistics">
                                <Col className="coin-value-statistics-heading">
                                    <Title className="coin-detailes-heading" level={3}>
                                        {cryptoDetail?.name} Value Statistics
                                    </Title>
                                    <p>
                                        An overview showing the statistics of {cryptoDetail?.name}, such as the base and
                                        quote currency, the rank, and trading volume.
                                    </p>
                                </Col>
                                {stats.map(({icon, title, value}, index) => (
                                    <Col key={index} className="coin-stats">
                                        <Col className="coin-stats-name">
                                            <Text>{icon}</Text>
                                            <Text>{title}</Text>
                                        </Col>
                                        <Text className="stats">$ {value}</Text>
                                    </Col>
                                ))}
                            </Col>
                            <Col className="other-stats-info">
                                <Col className="coin-value-statistics-heading">
                                    <Title className="coin-detailes-heading" level={3}>
                                        Other Statistics
                                    </Title>
                                    <p>An overview showing the stats of all cryptocurrencies</p>
                                </Col>
                                {genericStats.map(({icon, title, value}, index) => (
                                    <Col key={index} className="coin-stats">
                                        <Col className="coin-stats-name">
                                            <Text>{icon}</Text>
                                            <Text>{title}</Text>
                                        </Col>
                                        <Text className="stats">$ {value}</Text>
                                    </Col>
                                ))}
                            </Col>
                        </Col>
                        <Col className="coin-desc-link">
                            <Row className="coin-desc">
                                <Title className="coin-details-heading" level={3}>
                                    What is {cryptoDetail?.name}?
                                </Title>
                                {cryptoDetail?.description ? HTMLReactParser(cryptoDetail.description) : ""}
                            </Row>
                            <Col className="coin-links">
                                <Title className="coin-details-heading" level={3}>
                                    {cryptoDetail?.name} Links
                                </Title>
                                {cryptoDetail?.links.map((link, index) => (
                                    <Row key={index} className="coin-link">
                                        <Title className="link-name" level={5}>
                                            {link.type}
                                        </Title>
                                        <a href={link.url} rel="noreferrer" target="_blank">
                                            {link.name}
                                        </a>
                                    </Row>
                                ))}
                            </Col>
                        </Col>
                    </>
                ) : (
                    <span>Crypto does not exist</span>
                )}
            </Col>
        </>
    );
}
