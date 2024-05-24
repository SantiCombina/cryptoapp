export interface CryptoCoin {
    "24hVolume": string;
    btcPrice: string;
    change: string;
    coinrankingUrl: string;
    color: string;
    contractAddresses: any[];
    iconUrl: string;
    listedAt: number;
    lowVolume: boolean;
    marketCap: string;
    name: string;
    price: string;
    rank: number;
    sparkline: string[];
    symbol: string;
    tier: number;
    uuid: string;
}

export interface CryptoStats {
    total: number;
    total24hVolume: string;
    totalCoins: number;
    totalExchanges: number;
    totalMarketCap: string;
    totalMarkets: number;
}

export interface CryptoDetail extends CryptoCoin {
    allTimeHigh: {
        price: string;
        timestamp: number;
    };
    description: string;
    fullyDilutedMarketCap: string;
    hasContent: boolean;
    links: {
        name: string;
        type: string;
        url: string;
    }[];
    notices: any;
    numberOfExchanges: number;
    numberOfMarkets: number;
    priceAt: number;
    supply: {
        confirmed: boolean;
        supplyAt: number;
        max: any;
        total: string;
    };
    tags: string[];
    websiteUrl: string;
}

export interface CryptoDetailResponse {
    data: {
        coin: CryptoDetail;
    };
}

export interface CryptoCoinResponse {
    data: {
        coins: CryptoCoin[];
        stats: CryptoStats;
    };
}
