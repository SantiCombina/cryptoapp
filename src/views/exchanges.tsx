// import millify from "millify";
// import {Collapse, Row, Col, Typography, Avatar} from "antd";
// import HTMLReactParser from "html-react-parser";

// import {Loader} from "@/components/loader";

// const {Text} = Typography;
// const {Panel} = Collapse;

// export function Exchanges() {
//     const {data, isFetching} = useGetExchangesQuery();
//     const exchangesList = data?.data?.exchanges;

//     if (isFetching) return <Loader />;

//     return (
//         <>
//             <Row>
//                 <Col span={6}>Exchanges</Col>
//                 <Col span={6}>24h Trade Volume</Col>
//                 <Col span={6}>Markets</Col>
//                 <Col span={6}>Change</Col>
//             </Row>
//             <Row>
//                 {exchangesList.map((exchange: any) => (
//                     <Col key={exchange.id} span={24}>
//                         <Collapse>
//                             <Panel
//                                 key={exchange.id}
//                                 header={
//                                     <Row key={exchange.id}>
//                                         <Col span={6}>
//                                             <Text>
//                                                 <strong>{exchange.rank}.</strong>
//                                             </Text>
//                                             <Avatar className="exchange-image" src={exchange.iconUrl} />
//                                             <Text>
//                                                 <strong>{exchange.name}</strong>
//                                             </Text>
//                                         </Col>
//                                         <Col span={6}>${millify(exchange.volume)}</Col>
//                                         <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
//                                         <Col span={6}>{millify(exchange.marketShare)}%</Col>
//                                     </Row>
//                                 }
//                                 showArrow={false}
//                             >
//                                 {HTMLReactParser(exchange.description || "")}
//                             </Panel>
//                         </Collapse>
//                     </Col>
//                 ))}
//             </Row>
//         </>
//     );
// }
