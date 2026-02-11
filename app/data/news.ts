'use server'

import axios from "axios";
import { NewsItem } from "../types/news-types";

const BASE_API = process.env.BASE_API || "http://localhost:3000";

export const getAllNews = async () => {
    const response = await axios.get(`${BASE_API}/news`);
    console.log("News data:", response.data);

    if (response.status !== 200) {
        throw new Error("Failed to fetch news data");
    }
    return response.data.data;
}

export const createNews = async (newsData: NewsItem) => {
  const response = await axios.post(`${BASE_API}/news`, {
    title: newsData.title,
    content: newsData.content,
    imageNews: newsData.imageNews,
  });

  return response.data;
};