import Image from "next/image";
import Logo from "../../public/logo.png";
import Link from "next/link";

export default function Footer() {
    return (
    <footer className="w-full bg-[#234b68] text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-16">

            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-12">



                <div className=" space-y-2">
                    <div className="flex items-center gap-5">
                        <Image src={Logo} alt="RDS Logo" width={50} height={50} />
                        <h3 className="text-lg font-semibold">Reycom Dokumen Solusi</h3>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed">
                        RDS Group stands at the intersection of legacy physical records
                        and the future of digital intelligence, engineering seamless
                        data ecosystems for Southeast Asia’s leading enterprises.
                    </p>

                    <div className="pt-2">
                        <p className="text-sm font-medium mb-2">Our Company Contact</p>
                        <button className="border border-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-[#234b68] transition">
                            Visit Us
                        </button>
                    </div>

                </div>


                {/* COLUMN 2 VIETNAM */}
                <div className=" space-y-2">
                    <h4 className="text-base font-semibold">Also visit our other website</h4>
                    <div>
                        <p className="text-sm mb-4">Vietnam :</p>
                        <a
                            href="https://rdsvietnam.vn/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm underline hover:text-gray-300 transition">

                            https://rdsvietnam.vn/ 
                        </a>
                    </div>
                </div>



                {/* -------------------------------COLUMN 3 ABOUT POLICY--------------------- */}

                <div className="space-y-4">
                    <h4 className="font-semibold text-base">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li>
                                <Link href="/about" className="hover:text-white transition">
                                About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-white transition">
                                Privacy Police
                                </Link>
                            </li>
                            <li>
                                <Link href="/video" className="hover:text-white transition">
                                Video
                                </Link>
                            </li>
                        </ul>
                 </div>


                {/* -------------------------------COLUMN 4 LINE--------------------- */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-base">Line</h4>
                    <ul className="space-y-2 text-sm text-gray-200">
                        <li>Business Process</li>
                        <li>System Integrate</li>
                        <li>Printing And Creative Serve</li>
                        <li>HealthCare Manage</li>
                        <li>Reports</li>
                    </ul>
                </div>                
     
            </div>    
        </div>

    </footer>

    );


}