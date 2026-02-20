import axios from "axios";
import { ApplyItem } from "../types/apply-types";
import { Context } from "radix-ui/internal";
import { BASE_API, parseApiResponse } from "./api";    


//GET ALL APPLIER
export async function getAllApply(): Promise<ApplyItem[]> {
  const url = `${BASE_API}/apply`;
  const headers: Record<string,string> = { "Accept": "application/json" };


  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token") || localStorage.getItem("admin_token") || null;
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  
  const res = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-store",
  });
  return parseApiResponse<ApplyItem[]>(res);
}

//GET APPLIER BY ID
export async function getApplyById(id: number): Promise<ApplyItem> {
    const url = `${BASE_API}/apply/${id}`;
    const res = await fetch(url, {cache: "no-store"});
    return parseApiResponse<ApplyItem>(res);
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



