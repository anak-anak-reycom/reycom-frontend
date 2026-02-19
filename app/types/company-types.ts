//app/types/company-types.ts

import { CountryBrief } from "./country-types";
import { BranchItem } from "./branch-types";

export interface Company {
  id: number;
  nameCompany: string;
  country: CountryBrief | null; 
  branches: BranchItem[];
  createdAt: Date | string; 
  updatedAt: Date |string; 
}

export interface CompanyBrief {
  id: number;
  nameCompany: string;
  branches?: {
    id: number;
    nameBranch: string;
    streetAddress?: string;
    phone?: number;
  }[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
