export interface CryptoNews {
    url: string;
    title: string;
    description: string;
    thumbnail: string;
    createdAt: string;
}

export interface CryptoNewsResponse {
    data: CryptoNews[];
}
