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
import {LineChart} from "@/components/line-chart";
import {Loader} from "@/components/loader";

const {Title, Text} = Typography;
const {Option} = Select;

export function CryptoDetails() {
    const [timePeriod, setTimePeriod] = useState("7d");

    const {coinId} = useParams();
    const {data, isFetching} = useGetCryptoDetailsQuery(coinId);
    const {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod});

    const cryptoDetails = data?.data?.coin;

    if (isFetching) return <Loader />;

    const time = ["3h", "24d", "7d", "30d", "3m", "1y", "3y", "5y"];

    const stats = [
        {title: "Price to USD", value: `$ ${data?.price && millify(data.price)}`, icon: <DollarCircleOutlined />},
        {title: "Rank", value: data?.rank, icon: <NumberOutlined />},
        {title: "24h Volume", value: `$ ${data?.volume && millify(data.volume)}`, icon: <FundOutlined />},
        {title: "Market Cap", value: `$ ${data?.marketCap && millify(data.marketCap)}`, icon: <DollarCircleOutlined />},
        {title: "All-time-high(daily avg.)", value: `$ ${millify(data?.allTimeHigh.price)}`, icon: <TrophyOutlined />},
    ];

    const genericStats = [
        {title: "Number Of Markets", value: data?.numberOfMarkets, icon: <FundOutlined />},
        {title: "Number Of Exchanges", value: data?.numberOfExchanges, icon: <MoneyCollectOutlined />},
        {
            title: "Aprroved Supply",
            value: data?.approvedSupply ? <CheckCircleOutlined /> : <StopOutlined />,
            icon: <ExclamationCircleOutlined />,
        },
        {title: "Total Supply", value: `$ ${millify(data?.totalSupply)}`, icon: <ExclamationCircleOutlined />},
        {
            title: "Circulating Supply",
            value: `$ ${millify(data?.circulatingSupply)}`,
            icon: <ExclamationCircleOutlined />,
        },
    ];

    return (
        <>
            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Title className="coin-name" level={2}>
                        {cryptoDetails.name} ({cryptoDetails.slug}) Price
                    </Title>
                    <p>{cryptoDetails.name} live price in US dollars. View value statistics, market cap and supply.</p>
                </Col>
                <LineChart
                    coinHistory={coinHistory}
                    coinName={cryptoDetails.name}
                    currentPrice={millify(cryptoDetails.price)}
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
                                {cryptoDetails.name} Value Statistics
                            </Title>
                            <p>
                                An overview showing the statistics of {cryptoDetails.name}, such as the base and quote
                                currency, the rank, and trading volume.
                            </p>
                        </Col>
                        {stats.map(({icon, title, value}) => (
                            <Col key={coinId} className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="stats">{value}</Text>
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
                        {genericStats.map(({icon, title, value}) => (
                            <Col key={coinId} className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="stats">{value}</Text>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className="coin-desc-link">
                    <Row className="coin-desc">
                        <Title className="coin-details-heading" level={3}>
                            What is {cryptoDetails.name}?
                        </Title>
                        {HTMLReactParser(cryptoDetails.description)}
                    </Row>
                    <Col className="coin-links">
                        <Title className="coin-details-heading" level={3}>
                            {cryptoDetails.name} Links
                        </Title>
                        {cryptoDetails.links.map((link: any) => (
                            <Row key={link.name} className="coin-link">
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
            </Col>
        </>
    );
}
