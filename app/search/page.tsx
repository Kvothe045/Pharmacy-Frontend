// app/search/page.tsx
import { getProducts, getCategories } from '@/lib/api'
import SearchResults from '@/components/search-result'
import Navbar from '@/components/navbar'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchResults 
          allProducts={products}
          categories={categories}
        />
      </div>
    </main>
  )
}
