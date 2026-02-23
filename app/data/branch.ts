//data/branch.ts
'use server'
import axios from "axios";
import { BranchItem } from "../types/branch-types";
import { BASE_API, parseApiResponse } from "./api";

//-----------GET ALL BRANCH
export const getAllBranch = async () => {
    const response = await axios.get(`${BASE_API}/branch`);
    console.log("Branch data:", response.data);
    console.log("URL =", `${BASE_API}/branch`);

    if (response.status !== 200) {
        throw new Error("Failed to fetch branch data");
    }
    return response.data.data;
}

//------------CREATE BRANCH
export const createBranch = async (branchData: BranchItem) => {
  const response = await axios.post(`${BASE_API}/branch`, {
      nameBranch: branchData.nameBranch,
      streetAddress: branchData.streetAddress,
      linkMaps: branchData.linkMaps,
      phone: branchData.phone,
      email: branchData.email,
      website: branchData.website,
  });

  return response.data;
};

//------------GET BRANCH BY ID
export const getBranchById = async (id: number) => {
    const response = await axios.get(`${BASE_API}/branch/${id}`);
    return response.data.data;
}

//-----------DELETE BRANCH
export async function deleteBranch(id: number | string): Promise<{ ok: boolean }> {
    const url = `${BASE_API}/branch/${id}`;
    const res = await fetch(url, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete branch");
    }
    return { ok: true };
}

