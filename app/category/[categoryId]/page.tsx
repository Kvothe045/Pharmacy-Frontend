import { getProducts, getCategories } from '@/lib/api'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/product-card'
import CategorySection from '@/components/category-section'
import Navbar from '@/components/navbar'

export default async function CategoryPage({
  params,
}: {
  params: {
    categoryId: string
  }
}) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  const category = categories.find(cat => cat.id === params.categoryId)
  if (!category) return notFound()

  const categoryProducts = products.filter(prod => prod.category?.id === params.categoryId)

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{category.name}</h1>
        <CategorySection categories={categories} />
        {categoryProducts.length === 0 ? (
          <div className="text-gray-500 py-12 text-center">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
