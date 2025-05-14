'use client'

import { Search, MapPin } from 'lucide-react'
import { Billboard } from '@/types/types'

interface HeroSectionProps {
  billboard?: Billboard
}

export default function HeroSection({ billboard }: HeroSectionProps) {
  return (
    <section className="relative py-20 bg-gradient-to-r from-sky-200 to-teal-100">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
          Say GoodBye to high medicine prices
        </h1>
        <p className="text-lg mb-8 text-gray-700">
          Compare prices and save up to <span className="font-bold">71%</span>
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button className="flex items-center justify-center bg-white px-4 py-2 rounded-full shadow hover:shadow-md transition">
            <MapPin className="mr-2 text-teal-600" size={18} /> 
            <span>Deliver to</span>
          </button>
          
          <div className="flex items-center w-full max-w-md bg-white rounded-full shadow overflow-hidden">
            <input
              type="text"
              placeholder="Search your Medicine or Healthcare essentials here"
              className="flex-1 px-4 py-2 outline-none"
            />
            <button className="bg-blue-500 px-6 py-2 text-white font-medium hover:bg-blue-600 transition">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
