'use client'

import { Category } from '@/types/types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (categoryId: string | null) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-3">
        <button
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === null
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => onSelectCategory(null)}
        >
          All Products
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
