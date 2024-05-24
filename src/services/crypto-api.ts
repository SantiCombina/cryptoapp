import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {API_KEY} from "./config";

import {CryptoCoinResponse, CryptoDetailResponse} from "@/types/crypto-types";

const cryptoApiHeaders = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query<CryptoCoinResponse, number>({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query<CryptoDetailResponse, string>({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
        }),
    }),
});

export const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi;
