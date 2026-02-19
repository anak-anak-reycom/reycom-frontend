import axios from "axios";
import { BranchItem } from "../types/branch-types";
import { BASE_API, parseApiResponse } from "./api";

//GET ALL BRANCH
export async function getAllBranch(): Promise<BranchItem[]> {
    const url = `${BASE_API}/branch`;
    const res = await fetch(url, {cache: "no-store"});
    return parseApiResponse<BranchItem[]>(res);
}


//CREATE BRANCH



