'use client'

import { useState, useMemo } from 'react'
import CategoryFilter from './category-filter'
import ProductCard from './product-card'
import { Product, Category } from '@/types/types'

interface ProductsSectionProps {
  products: Product[]
  categories: Category[]
}

export default function ProductsSection({ products, categories }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products
    // Fix: Use product.category.id instead of product.categoryId
    return products.filter(product => product.category?.id === selectedCategory)
  }, [products, selectedCategory])
  
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
