import axios from "axios";
import { ApplyItem } from "../types/apply-types";
import { Context } from "radix-ui/internal";
import { BASE_API, parseApiResponse } from "./api";    


//GET ALL APPLIER
export const getAllApplier  = async () => {
    const response = await axios.get(`${BASE_API}/apply`)
    console.log ("Applier Data :", response.data )
    console.log("URL =", `${BASE_API}/apply`);

    return response.data.data;
}

//GET APPLIER BY ID
export const getApplierById = async (id :number) => {
    const response = await axios.get(`${BASE_API}/apply/${id}`)
    return response.data.data;

}


//CREATE APPLIER
export const createSApplier = async (applyData : ApplyItem) => {
    const response = await axios.post(`${BASE_API}/apply`, {
        
        nameApply: applyData.nameApply,
        emailApply: applyData.emailApply,
        phoneNumberApply: applyData.phoneNumberApply,
        gender: applyData.gender,
        domicile: applyData.domicile,
        resume: applyData.resume,
        
    })
    
    return response.data.data;
}
//DELETE APPLIER
export async function deleteApply(id: number | string): Promise<{ ok: boolean }> {

    const url = `${BASE_API}/apply/${id}`;
    const res = await fetch(url, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete apply");
    }
    return { ok: true };
}



