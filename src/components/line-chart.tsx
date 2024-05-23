import {Line} from "react-chartjs-2";
import {Col, Row, Typography} from "antd";

const {Title} = Typography;

interface Props {
    coinHistory: any;
    currentPrice: any;
    coinName: string;
}

export function LineChart({coinHistory, currentPrice, coinName}: Props) {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.prices.length; i += 1) {
        coinPrice.push(coinHistory.prices[i][1]);
        coinTimestamp.push(new Date(coinHistory.prices[i][0]).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price In USD",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd",
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <Row className="chart-header">
                <Title className="chart-title" level={2}>
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title className="price-change" level={5}>
                        {coinHistory?.change}%
                    </Title>
                    <Title className="current-price" level={5}>
                        Current {coinName} Price: $ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
}
