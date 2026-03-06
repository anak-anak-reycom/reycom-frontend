import BranchList from "@/app/components/admin/branches/branchList";
import BranchCard from "@/app/components/admin/branches/branchCard";

const Branches = () => {
  return (
        <main className="min-h-screen">    
            <BranchList/>
            <BranchCard/>
        </main>
  )

  
}

export default Branches