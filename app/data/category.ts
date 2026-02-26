//data/category.ts
'use server'

import axios from "axios";
import { CategoryItem , CategoryName, JobTypeName} from "../types/category-types";
import { BASE_API, parseApiResponse } from "./api";

//GET ALL CATEGORY
export const getAllCategory = async () => {
    const response = await axios.get(`${BASE_API}/category`);
    console.log("Category data:", response.data);
    console.log("URL =", `${BASE_API}/category`);
    
}

//GET CATEGORY NAME
export const getCategoryName = async (nameCategory : CategoryName) => {
    const response = await axios.get(`${BASE_API}/career/${nameCategory}`);
    return response.data.data;
}

//GET JOB TYPE NAME
export const getJobTypes = async (nameJobType: JobTypeName) => {
    const response = await axios.get(`${BASE_API}/career/${nameJobType}`);
    return response.data.data;
}

//CREATE CATEGORY 
export const createCategory = async (categoryData : CategoryItem) => {
    const response = await axios.post(`${BASE_API}/category`, 
        {
            nameCategory : categoryData.name_category,
            jobType : categoryData.job_type
        })

        return response.data.data
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

