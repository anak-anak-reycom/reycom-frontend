// app/admin/branches/page.tsx
import BranchCard, { Branch } from "@/app/components/admin/branches/branchCard";
import CreateBranchCard from "@/app/components/admin/branches/createBranch";
import EditBranchCard from "@/app/components/admin/branches/editBranch";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API; 

export default async function BranchesPage() {
  const res = await fetch(`${BASE_API}/branch`, { next: { revalidate: 60 } });
  if (!res.ok) {
    return <div className="min-h-screen p-8">Gagal memuat data branches (status: {res.status})</div>;
  }

  const json = await res.json();
  const branches: Branch[] = json?.data ?? [];

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 gap-4">
        {branches.length === 0 ? (
          <div>Tidak ada branch.</div>
        ) : (
          branches.map((b) => <BranchCard key={b.id} branch={b} />)
        )}
      </div>

       <div className="flex justify-start mt-8">
              <button
                  
                  className="bg-linear-to-br from-green-700 to-green-500 px-4 py-2 text-white font-semibold rounded-xl"
              >
                + Add News
              </button>
      </div>

    </main>


  );
}