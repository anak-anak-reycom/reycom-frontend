import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface ApplyItem {

    idApply: number;
    nameApply: string;
    emailApply: string;
    phoneNumberApply: number;
    gender: string;
    domicile: string;
    resume: string;
    createdAt: Date;
    updatedAt: Date;

}