//data/country.ts
'use server'

import axios from "axios";
import { Country } from "../types/country-types";
import { CountryBrief } from "../types/country-types";
import { BASE_API, parseApiResponse } from "./api";

//GET ALL COUNTRY
export const getAllCountry = async () => {
    const response = await axios.get(`${BASE_API}/country`);
    console.log("Country data:", response.data);
    console.log("URL =", `${BASE_API}/country`);

    if (response.status !== 200) {
        throw new Error("Failed to fetch country data");
    }
    return response.data.data;
}

//GET COUNTRY BY ID
export const getCountryById = async (id: number) => {
    const response = await axios.get(`${BASE_API}/country/${id}`);
    return response.data.data;
}

//DELETE COUNTRY
export async function deleteCountry(id: number | string): Promise<{ ok: boolean }> {
    const url = `${BASE_API}/country/${id}`;
    const res = await fetch(url, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete country");
    }
    return { ok: true };
}