'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  link?: string
  linkText?: string
  showArrow?: boolean
}

function ServiceCard({
  title,
  description,
  link,
  linkText,
  showArrow = false,
}: ServiceCardProps) {
  return (
    <div className="relative min-h-[400px] mx-auto overflow-hidden rounded-3xl p-8 text-white md:p-10">
      {/* Background Image */}
      <Image
        src="/printing1.png"
        alt="Printing Background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold md:text-3xl">{title}</h3>

          {showArrow && (
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-200">
              Your All-in-One Creative Print Partner!
              <ArrowRight className="h-4 w-4" />
            </p>
          )}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-slate-100 md:text-base">
          {description}
        </p>

        {link && (
          <p className="mt-6 text-xs text-slate-300 md:text-sm">
            {linkText}{' '}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200"
            >
              {link.replace('http://', '').replace('https://', '')}
            </a>
          </p>
        )}
      </div>
    </div>
  )
}

export default function PrintingServicePages() {
  return (
    <main className=" bg-white">
      <section className="border-t border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Printing and Creative Services
          </h2>
        </div>
      </section>
      <section className="px-6 py-5 md:py-6 lg:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Card 1 */}
            <ServiceCard
              title="Printing And Creative Services"
              description="From design to delivery, we're your one-stop shop for high-tech printing. Whether it's a quick copy or custom branding, our world-class D2P fleet—from digital offset to B2 inkjet—brings your projects to life. You'll get consistent quality and hardcover binding, and our couriers deliver the perfection straight to your door."
              link="http://www.jpsprint.co.id"
              linkText="See what we can do:"
              showArrow
            />

            {/* Card 2 */}
            <ServiceCard
              title="Online Printing Platform (Printaholic)"
              description="Printaholic is a digital print retail store that provides one-stop online printing solutions for small-to-large businesses. We deliver high-quality product printing like flyers, brochures, banners, office stationaries, etc. The premium online printing platform includes production tools for individuals or companies to get personal print, commercial, and other printing-related needs with affordable prices."
              link="http://www.printaholic.co.id"
              linkText="Learn more at:"
            />
          </div>
        </div>
      </section>
      
    </main>
  )
}
