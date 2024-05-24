import millify from "millify";
import {Link} from "react-router-dom";
import {Card, Col, Input, Row} from "antd";
import {useEffect, useState} from "react";

import {useGetCryptosQuery} from "../services/crypto-api";

import {CryptoCoin} from "@/types/crypto-types";

interface CryptocurrenciesProps {
    simplified?: boolean;
}

export function Cryptocurrencies({simplified}: CryptocurrenciesProps) {
    const count = simplified ? 10 : 100;
    const {data: cryptosList, isLoading} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState<CryptoCoin[] | undefined>(undefined);

    const searchCrypto = (query: string) => {
        const filteredData = cryptosList?.data?.coins.filter((coin) =>
            coin.name.toLowerCase().includes(query.toLowerCase()),
        );

        setCryptos(filteredData);
    };

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);
    }, [cryptosList]);

    if (isLoading || cryptos === undefined) return "Loading...";

    return (
        <>
            {!simplified && (
                <div className="sarch-crpto">
                    <Input placeholder="Search Cryptocurrency" onChange={(e) => searchCrypto(e.target.value)} />
                </div>
            )}
            <Row className="crypto-card-container" gutter={[32, 32]}>
                {cryptos.length > 0
                    ? cryptos.map((currency) => (
                          <Col key={currency.uuid} className="crypto-card" lg={16} sm={12} xs={24}>
                              <Link to={`/crypto/${currency.uuid}`}>
                                  <Card
                                      extra={<img className="crypto-image" src={currency.iconUrl} />}
                                      title={`${currency.rank}. ${currency.name}`}
                                  >
                                      <p>Price: {millify(Number(currency.price))}</p>
                                      <p>Market Cap: {millify(Number(currency.marketCap))}</p>
                                      <p>Daily Change: {millify(Number(currency.change))}%</p>
                                  </Card>
                              </Link>
                          </Col>
                      ))
                    : "No data available"}
            </Row>
        </>
    );
}
