'use client'

import axios from 'axios'
import {createNews} from "@/app/data/news";
import React, {useEffect, useState} from "react";

export default function NewsForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

}