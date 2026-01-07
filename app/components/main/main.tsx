import { ChartColumnIncreasing } from "lucide-react"

export const Main = () => {
    return (
        <section className="py-5">
            <div className="grid grid-cols-2"> 
                <div>
                <h2 className="text-[42px] font-sans font-semibold"> <span className="text-secondary">Why Must</span> Reycom?</h2>
                    <div className="">
                    <p className="py-4 text-secondary max-w-md">
                      <span className="font-semibold text-primary inline-flex items-center gap-2">
                        <ChartColumnIncreasing className="w-5 h-5 text-accent" strokeWidth={1.5} />
                        Guarding health
                      </span>
                      , ensuring quality, securing trust—our certified promise.
                    </p>
                    </div>
                    </div>
            </div>
        </section>
    )
}