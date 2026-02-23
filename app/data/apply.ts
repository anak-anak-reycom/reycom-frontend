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
    return response.data.date;

}


export type CreateApplyPayload = Omit<ApplyItem, "idApply" | "createdAt" | "updatedAt">;

//CREATE APPLIER
export async function createApply(payload: CreateApplyPayload): Promise<ApplyItem> {
    const url = `${BASE_API}/apply`
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    return parseApiResponse<ApplyItem>(res);
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



