// app/lib/slug.ts
export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") 
    .trim()
    .replace(/\s+/g, "-")            
    .replace(/-+/g, "-");           
}

export function extractIdFromSlug(slug: string): number {
  
  const id = parseInt(slug.split("-")[0], 10);
  return Number.isNaN(id) ? NaN : id;
  
}


