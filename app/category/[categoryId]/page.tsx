// app/category/[categoryId]/page.tsx
import { getProducts, getCategories } from '@/lib/api'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/product-card'
import CategorySection from '@/components/category-section'
import Navbar from '@/components/navbar'

// For Next.js 15.3.2, we need to use the correct typing
// Remove all interface definitions and let Next.js infer the types

export default async function CategoryPage({ 
  params 
}: { 
  params: { categoryId: string } 
}) {
  // fetch products and categories
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  // find the current category
  const category = categories.find(cat => cat.id === params.categoryId)
  if (!category) {
    return notFound()
  }

  // filter products for this category
  const categoryProducts = products.filter(
    product => product.category?.id === params.categoryId
  )

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">{category.name}</h1>
          <CategorySection categories={categories} />
          
          {categoryProducts.length === 0 ? (
            <div className="text-gray-500 py-12 text-center">
              No products found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}