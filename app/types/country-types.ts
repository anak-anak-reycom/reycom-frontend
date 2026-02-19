
//app/types/country-types.ts

export interface CountryBrief {
  id: number;
  nameCountry: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Country {
  id: number;
  nameCountry: string;
  createdAt: Date | string; 
  updatedAt: Date | string; 
}