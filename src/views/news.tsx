import {Select, Typography, Row, Col, Card} from "antd";
import moment from "moment";

import {useGetCryptosQuery} from "../services/crypto-api";
import {useGetCryptoNewsQuery} from "../services/crypto-news-api";

import {Loader} from "@/components/loader";

const {Text, Title} = Typography;
const {Option} = Select;

interface CryptocurrenciesProps {
    simplified?: boolean;
}

export function News({simplified}: CryptocurrenciesProps) {
    const {data: cryptoNews} = useGetCryptoNewsQuery();
    const {data} = useGetCryptosQuery(100);

    if (!cryptoNews) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        optionFilterProp="children"
                        placeholder="Select a Crypto"
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => (
                            <Option key={coin.uuid} value={coin.name}>
                                {coin.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}
            {cryptoNews.data.slice(0, simplified ? 10 : 100).map((news) => (
                <Col key={news.url} lg={8} sm={12} xs={24}>
                    <Card hoverable className="news-card">
                        <a href={news.url} rel="noreferrer" target="_blank">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                    {news.title}
                                </Title>
                                <img
                                    alt={news.title}
                                    src={news.thumbnail || "https://www.cryptocompare.com"}
                                    style={{maxWidth: "200px", maxHeight: "100px"}}
                                />
                            </div>
                            <p>
                                {news.description.length > 100
                                    ? `${news.description.substring(0, 100)}...`
                                    : news.description}
                            </p>
                            {/* <div className="provider-container">
                                <div>
                                    <Avatar
                                        alt=""
                                        src={
                                            news.provider[0]?.image?.thumbnail?.contentUrl ||
                                            "https://www.cryptocompare.com"
                                        }
                                    />
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                            </div> */}
                            <Text>{moment(news.createdAt).startOf("second").fromNow()}</Text>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
