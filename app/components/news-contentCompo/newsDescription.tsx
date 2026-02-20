"use client";
import { NewsItem } from '@/app//types/news-types'
import {  getAllNews } from '../../data/news'

import React from "react";

export default function NewsDescription({ content }: { content: string }) {
    return (
        <div className="news-description">
            <p className="news-description-content">{content}</p>
        </div>
    );
}
