import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {API_KEY} from "./config";

import {CryptoNewsResponse} from "@/types/crypto-news-types";

const cryptoNewsHeaders = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
};

const baseUrl = "https://cryptocurrency-news2.p.rapidapi.com/v1";

const createRequest = (url: string) => ({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query<CryptoNewsResponse, void>({
            query: () => createRequest(`/coindesk`),
        }),
    }),
});

export const {useGetCryptoNewsQuery} = cryptoNewsApi;
