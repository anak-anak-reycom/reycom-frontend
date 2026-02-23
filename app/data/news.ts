'use server'

import axios from "axios";
import { NewsItem } from "../types/news-types";

const BASE_API = process.env.BASE_API || "http://localhost:3000";

//----------GET ALL NEWS----------------
export const getAllNews = async () => {
    const response = await axios.get(`${BASE_API}/news`);
    console.log("News data:", response.data);
    console.log("URL =", `${BASE_API}/news`);

    if (response.status !== 200) {
        throw new Error("Failed to fetch news data");
    }
    return response.data.data;
}

//----------GET NEWS BY ID------------
export const getNewsById = async (id: number) => {
    const response = await axios.get(`${BASE_API}/news/${id}`);
    return response.data.data;
}

//----------CREATE NEWS---------------
export const createNews = async (newsData: NewsItem) => {
  const response = await axios.post(`${BASE_API}/news`, {
    title: newsData.title,
    content: newsData.content,
    imageNews: newsData.imageNews,
  });

  return response.data;
};

//-----------UPDATE NEWS-------------------
export const updateNews = async (newsData: NewsItem) => {
    const response = await axios.put(`${BASE_API}/news`, {
        title: newsData.title,
        content: newsData.content,
        imageNews: newsData.imageNews,
    })
    return response.data;
}

//----------DELETE NEWS-------------------
export const deleteNews = async (id: number) => {
    const response = await axios.delete(`${BASE_API}/news`);
    return response.data;
}

