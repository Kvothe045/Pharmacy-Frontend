'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Category } from '@/types/types'

interface CategorySectionProps {
  categories: Category[]
}

export default function CategorySection({ categories }: CategorySectionProps) {
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
  }, [categories])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 2
      const newPosition =
        direction === 'left'
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(maxScroll, scrollPosition + scrollAmount)

      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })

      setScrollPosition(newPosition)
    }
  }

  const emojiMap: Record<string, string> = {
    'Cold & Cough': '🤧',
    'Joint Care': '🦴',
    'Ayurveda': '🌿',
    'Sexual Wellness': '❤️',
    'Diabetes': '🩸',
    'Women Care': '👩',
    'Immunity': '🛡️',
    'Pain Relief': '💊',
    'Heart Health': '❤️‍🩹',
    'Skin Care': '🧴',
  }

  const fallbackEmojis = ['💊', '🩺', '🌿', '🧬', '🧘', '👨‍⚕️', '👩‍⚕️', '🧴', '🧻', '🛡️']

  const getEmoji = (name: string) => {
    return emojiMap[name] || fallbackEmojis[name.length % fallbackEmojis.length]
  }

  const getBackgroundStyle = (name: string) => {
    const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const colorIndex = hash % gradientColors.length
    return gradientColors[colorIndex]
  }

  const gradientColors = [
    'from-teal-400 to-cyan-500',
    'from-pink-400 to-red-500',
    'from-purple-400 to-indigo-500',
    'from-orange-400 to-yellow-500',
    'from-emerald-400 to-lime-500',
    'from-sky-400 to-blue-500'
  ]

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Shop by Category</h2>

        <div className="relative">
          {scrollPosition > 0 && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
              onClick={() => scroll('left')}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 py-4 scrollbar-hide scroll-smooth"
          >
            {categories.map((category) => {
              const gradient = getBackgroundStyle(category.name)
              const emoji = getEmoji(category.name)

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="flex-shrink-0 w-[140px] text-center group"
                >
                  <div
                    className={`w-[120px] h-[120px] mx-auto mb-3 rounded-full flex items-center justify-center text-white text-4xl bg-gradient-to-br ${gradient} group-hover:scale-105 transition-transform`}
                  >
                    {emoji}
                  </div>
                  <h3 className="font-medium text-gray-800 group-hover:text-teal-600 transition">
                    {category.name}
                  </h3>
                </Link>
              )
            })}
          </div>

          {scrollPosition < maxScroll && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
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
