'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/product-card'
import { Product, Category } from '@/types/types'

interface SearchResultsProps {
  allProducts: Product[]
  categories: Category[]
}

export default function SearchResults({ allProducts, categories }: SearchResultsProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([])
  const [matchedCategory, setMatchedCategory] = useState<Category | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  
  useEffect(() => {
    if (!query) {
      setMatchedProducts([])
      setMatchedCategory(null)
      setRelatedProducts([])
      return
    }
    
    const lowerQuery = query.toLowerCase()
    
    // Check if query matches any category name
    const category = categories.find(cat => 
      cat.name.toLowerCase().includes(lowerQuery)
    )
    
    setMatchedCategory(category || null)
    
    // Find exact product matches
    const exactMatches = allProducts.filter(product => 
      product.name.toLowerCase().includes(lowerQuery)
    )
    
    setMatchedProducts(exactMatches)
    
    // Find related products based on category
    if (exactMatches.length > 0 && exactMatches[0].category) {
      const categoryId = exactMatches[0].category.id
      const related = allProducts.filter(product => 
        product.category.id === categoryId && 
        !exactMatches.some(match => match.id === product.id)
      )
      setRelatedProducts(related)
    } else if (category) {
      // If category matched but no exact product matches
      const categoryProducts = allProducts.filter(product => 
        product.category.id === category.id
      )
      setMatchedProducts(categoryProducts)
      setRelatedProducts([])
    } else {
      setRelatedProducts([])
    }
  }, [query, allProducts, categories])
  
  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-center text-gray-500">Please enter a search term</p>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>
      
      {matchedCategory && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Category: {matchedCategory.name}
          </h2>
          {matchedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {matchedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found in this category</p>
          )}
        </div>
      )}
      
      {!matchedCategory && matchedProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Products Matching "{query}"
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {matchedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
      
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
      
      {matchedProducts.length === 0 && !matchedCategory && (
        <p className="text-center text-gray-500 py-8">
          No products found matching "{query}". Try a different search term.
        </p>
      )}
    </div>
  )
}
