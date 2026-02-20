//app/types/company-types.ts

import { CountryBrief } from "./country-types";
import { BranchItem } from "./branch-types";

export interface Company {
  id: number;
  nameCompany: string;
  country: CountryBrief | null; 
  branches: BranchItem[];
}

export interface CompanyBrief {
  id: number;
  nameCompany: string;
  branches?: {
    id: number;
    nameBranch: string;
    streetAddress?: string;
    phone?: number;
  } [];
}
