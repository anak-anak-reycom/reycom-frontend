//data/career.ts
'use server'
import axios from "axios";
import { CareerItem } from "../types/career-types";
import { BASE_API, parseApiResponse } from "./api" 


//GET ALL CAREER
export const getAllCareer = async () => {
    const response = await axios.get(`${BASE_API}/career`);
    console.log("Career data:", response.data);
    console.log("URL =", `${BASE_API}/career`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch career data");
    }   
    return response.data.data;}

//CREATE CAREER
export const createCareer = async (careerData: CareerItem) => {
  const response = await axios.post(`${BASE_API}/career`, {
    id: careerData.id,
    jobName: careerData.jobName,
    jobDate: careerData.jobDate, 
    jobDescription: careerData.jobDescription,
    jobResponbilities: careerData.jobResponbilities,
    jobRequirement: careerData.jobRequirement
  });

}

//GET CAREER BY ID
export const getCareerById = async (id: number) => {
    
    const response = await axios.get(`${BASE_API}/career/${id}`);  
    return response.data.data;
}

//DELETE CAREER
export const deleteCareer = async (id: number) => {
    const response = await axios.delete(`${BASE_API}/career/${id}`);
    return response.data.data;
}