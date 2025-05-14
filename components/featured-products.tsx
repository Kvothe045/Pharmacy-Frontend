'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './product-card'
import { Product } from '@/types/types'

interface FeaturedProductsProps {
  products: Product[]
  title?: string
}

export default function FeaturedProducts({ products, title = "Featured Products" }: FeaturedProductsProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (scrollRef.current) {
      setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth)
    }
    
    const handleResize = () => {
      if (scrollRef.current) {
        setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [products])
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 2
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(maxScroll, scrollPosition + scrollAmount)
      
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
      
      setScrollPosition(newPosition)
    }
  }
  
  if (products.length === 0) return null
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>
        
        <div className="relative">
          {scrollPosition > 0 && (
            <button 
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
              onClick={() => scroll('left')}
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 py-4 scrollbar-hide scroll-smooth"
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[220px] sm:w-[240px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {scrollPosition < maxScroll && (
            <button 
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
              onClick={() => scroll('right')}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
