import { ChromeIcon as ChartColumnIncreasing, Trophy, HandHeart, Share2, HeartPulse as HeartPlus } from "lucide-react"
import Image from "next/image"

export const Main = () => {
  return (
    <section className="py-16 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl justify-center mx-auto">
        {/* Left Content */}
        <div className="">
          <h2 className="text-4xl lg:text-5xl font-sans font-semibold leading-tight mb-8">
            <span className="text-secondary">Why Must</span> Reycom?
          </h2>

          <div className="space-y-5">
            {/* Icon List Items */}
            <div className="flex items-start gap-4">
              <ChartColumnIncreasing className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">Guarding health</span>, ensuring quality, securing trust—our certified promise.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Trophy className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">Awarded excellence</span>, recognized by industry leaders and standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <HandHeart className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">A human-centered approach</span>, compassion in every interaction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Share2 className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">Transparent processes</span>, open communication and accountability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <HeartPlus className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">Patient-first commitment</span>, your wellbeing is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Laptop Visual */}
        <div className="flex justify-center items-center">
         <Image src="/mockuplapt.png" alt="Professional healthcare provider" width={500} height={300} />
        </div>
      </div>
    </section>
  )
}
