//types/category-types.tsx

export interface CategoryItem {
      id_category: number,
      name_category: string,
      job_type: string,
      created_at: Date,
      updated_at: Date
}

export interface CategoryName {
      name_category: string,
}

export interface JobTypeName {
      name_category: string,
}