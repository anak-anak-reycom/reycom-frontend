import { ChartColumnIncreasing } from "lucide-react"
import { Trophy } from "lucide-react"
import { HandHeart } from "lucide-react"
import { Share2 } from "lucide-react"
import { HeartPlus } from "lucide-react"


export const Main = () => {
  return (
    <section className="py-5">
      <div className="grid grid-cols-2">
        <div>
          <h2 className="text-[42px] font-sans font-semibold">
            <span className="text-secondary">Why Must</span> Reycom?
          </h2>

                <div className="space-y-3 text-secondary max-w-md">

                {/* ========= ICON LIST=============== */}
                <div className="flex items-start gap-2">
                    <ChartColumnIncreasing className="w-5 h-5 text-accent mt-[2px]" />
                    <p>
                    <span className="font-semibold text-primary">Guarding health</span>,
                    ensuring quality, securing trust—our certified promise.
                    </p>
                </div>

                <div className="flex items-start gap-2">
                    <Trophy className="w-5 h-5 text-accent mt-[2px]" />
                    <p>
                    <span className="font-semibold text-primary">Awarded excellence</span>,
                    recognized by industry leaders    .
                    </p>
                </div>

                <div className="flex items-start gap-2">
                    <HandHeart className="w-5 h-5 text-accent mt-[2px]" />
                    <p>
                    <span className="font-semibold text-primary">Human-centered care</span>,
                    compassion in every service.
                    </p>
                </div>

                <div className="flex items-start gap-2">
                    <Share2 className="w-5 h-5 text-accent mt-[2px]" />
                    <p>
                    <span className="font-semibold text-primary">Transparent process</span>,
                    open and accountable.
                    </p>
                </div>

                <div className="flex items-start gap-2">
                    <HeartPlus className="w-5 h-5 text-accent mt-[2px]" />
                    <p>
                    <span className="font-semibold text-primary">Patient-first values</span>,
                    your health comes first.
                    </p>
                </div>

                </div>


        </div>
      </div>
    </section>
  )
}