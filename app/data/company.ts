//data/company.ts
'use server'

import axios from "axios";
import { CompanyBrief } from "../types/company-types";
import {Company} from "../types/company-types";
import { BASE_API, parseApiResponse } from "./api";    


//GET ALL COMPANY
export async function getAllCompany(): Promise<CompanyBrief[]> {
    const url = `${BASE_API}/company`;
    const res = await fetch(url, {cache: "no-store"});
    return parseApiResponse<CompanyBrief[]>(res);
}

//CREATE COMPANY
export const createCompany = async (companyData: CompanyBrief) => {
  const response = await axios.post(`${BASE_API}/company`, {
    nameCompany: companyData.nameCompany,

    
  });
}

export const getCompanyById = async (id: number): Promise<Company> => {
    const url = `${BASE_API}/company/${id}`;
    const res = await fetch(url, {cache: "no-store"});
    return parseApiResponse<Company>(res);
}

//DELETE COMPANY
export async function deleteCompany(id: number | string): Promise<{ ok: boolean }> {
    const url = `${BASE_API}/company/${id}`;
    const res = await fetch(url, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete company");
    }
    return { ok: true };
}

