//data/category.ts
'use server'

import axios from "axios";
import { CategoryItem } from "../types/category-types";
import { BASE_API, parseApiResponse } from "./api";

//GET ALL CATEGORY
export const getAllCategory = async () => {
    const response = await axios.get(`${BASE_API}/category`);
    console.log("Category data:", response.data);
    console.log("URL =", `${BASE_API}/category`);
    
}

//GET CATEGORY BY ID
export const getCategoryById = async (id: number) => {
    const response = await axios.get(`${BASE_API}/category/${id}`);
    return response.data.data;
}

//DELETE CATEGORY
export const deleteCategory = async (id: number) => {
    const response = await axios.delete(`${BASE_API}/category/${id}`);
    return response.data.data;
}