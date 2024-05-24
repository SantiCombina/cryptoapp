import {Col, Row, Tooltip, Typography} from "antd";
import {LineChart, CartesianGrid, Legend, Line, ResponsiveContainer, XAxis, YAxis} from "recharts";

const {Title} = Typography;

interface Props {
    coinHistory: any;
    currentPrice: any;
    coinName: string;
}

export function LineChartGraph({coinHistory, currentPrice, coinName}: Props) {
    const data =
        coinHistory?.data?.history.map((entry: any) => ({
            price: entry.price,
            timestamp: new Date(entry.timestamp).toLocaleDateString(),
        })) || [];

    return (
        <>
            <Row className="chart-header">
                <Title className="chart-title" level={2}>
                    {coinName} Price Chart{" "}
                </Title>
                <Col className="price-container">
                    <Title className="price-change" level={5}>
                        Change: {coinHistory?.data?.change}%
                    </Title>
                    <Title className="current-price" level={5}>
                        Current {coinName} Price: $ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <ResponsiveContainer height={300} width="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line activeDot={{r: 8}} dataKey="price" stroke="#8884d8" type="monotone" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
