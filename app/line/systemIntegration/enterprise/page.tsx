import CardEnterprise from "@/app/components/enterprisecompo/card";
import Fill from "@/app/components/enterprisecompo/fill";
import pict from "@/public/card.png";

export const metadata = { title: "Enterprise Content Management" };

const enterpriseContent = () => {
    return (
        <div >
            <CardEnterprise/>  
            <Fill/>
        </div>
    )
}
export default enterpriseContent