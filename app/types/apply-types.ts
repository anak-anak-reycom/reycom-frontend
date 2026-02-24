// apply-types.ts

import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface ApplyItem {

    idApply: number;
    nameApply: string;
    emailApply: string;
    phoneNumberApply: string;
    gender: string;
    domicile: string;
    resume: string;
    createdAt: Date;
    updatedAt: Date;

}