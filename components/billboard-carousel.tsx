'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BillboardProps {
  billboards: {
    id: string;
    imageUrl: string;
    label: string;
    categoryId?: string;
  }[];
}

export default function BillboardCarousel({ billboards }: BillboardProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  
  const totalSlides = billboards.length
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    // Pause autoplay for a few seconds when manually changing slides
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }
  
  // Handle autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying])
  
  // Pause autoplay when user interacts with carousel
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)
  
  if (!billboards || billboards.length === 0) {
    return (
      <div className="relative h-[300px] md:h-[400px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No promotions available</p>
      </div>
    )
  }
  
  return (
    <div 
      className="relative h-[300px] md:h-[400px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {billboards.map((billboard, index) => (
          <div key={billboard.id} className="min-w-full h-full relative">
            <Image
              src={billboard.imageUrl}
              alt={billboard.label}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {billboard.label}
              </h2>
              {billboard.categoryId && (
                <Link 
                  href={`/category/${billboard.categoryId}`}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors shadow-lg"
                >
                  Shop Now
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-10"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-10"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {billboards.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
