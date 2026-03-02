import ApplierList from "@/app/components/admin/applier/applierList";
import CreateJobForm from "@/app/components/admin/jobList/createJob";

const Applier = () => {
  return (
        <main className="min-h-screen">    
            <ApplierList/>
            <CreateJobForm/>
        </main>
  )

  
}

export default Applier