import { Carousel } from '../components/slidincarousel/carousel'

const carouselItems = [
  {
    id: 1,
    title: 'Summer Adventure',
    description: 'Explore beautiful beaches and islands',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Mountain Hiking',
    description: 'Discover breathtaking mountain views',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'City Exploration',
    description: 'Experience vibrant urban culture',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Forest Dreams',
    description: 'Immerse yourself in nature',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen py-8 md:py-12">
      <div className=" mx-auto px-4">

        <Carousel items={carouselItems} />

      </div>
    </main>
  )
}
