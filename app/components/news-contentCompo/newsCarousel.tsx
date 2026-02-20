"use client";

import React from "react";
import Image from "next/image";
import { NewsItem } from '@/app//types/news-types'
import {  getAllNews } from '../../data/news'

export default function NewsCarousel({ imageNews }: { imageNews: string }) {

    return (

        <div className="news-carousel">
            <img src={imageNews} alt="News Carousel" className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
    );
}