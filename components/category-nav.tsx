'use client'

import Link from 'next/link'
import { Category } from '@/types/types'

interface CategoryNavProps {
  categories: Category[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  // Define default categories in case none are provided
  const defaultCategories = [
    { id: '1', name: 'Medicines' },
    { id: '2', name: 'Personal Care' },
    { id: '3', name: 'Health Conditions' },
    { id: '4', name: 'Vitamins & Supplements' },
    { id: '5', name: 'Diabetes Care' },
    { id: '6', name: 'Healthcare Devices' },
    { id: '7', name: 'Health Article' },
  ]
  
  const displayCategories = categories?.length > 0 ? categories : defaultCategories
  
  return (
    <div className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto py-3 scrollbar-hide">
          {displayCategories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.id}`}
              className="whitespace-nowrap px-4 py-2 hover:bg-blue-600 transition rounded-md"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
