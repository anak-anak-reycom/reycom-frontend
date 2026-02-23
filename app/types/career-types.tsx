//types/career-types.tsx

export interface CareerItem {
    id: number,
    jobName: string,
    jobDate:Date, 
    jobDescription: string | null,
    jobResponbilities: string | null,
    jobRequirement: string | null
}