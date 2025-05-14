import { getProducts, getCategories, getBillboards } from '@/lib/api'
import Navbar from '@/components/navbar'
import BillboardCarousel from '@/components/billboard-carousel'
import CategorySection from '@/components/category-section'
import FeaturedProducts from '@/components/featured-products'
import ServiceSection from '@/components/service-section'
import Footer from '@/components/footer'
import Testimonials from '@/components/testimonials'

export default async function Home() {
  const [products, categories, billboards] = await Promise.all([
    getProducts(),
    getCategories(),
    getBillboards()
  ])

  const featuredProducts = products.filter(product => product.isFeatured)
  const newArrivals = products.slice(0, 10)
  const popularProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 10)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 text-gray-800">
      <Navbar />

      {/* Hero / Billboard */}
      <div className="bg-gradient-to-r from-cyan-100 to-blue-100 py-6">
        <BillboardCarousel billboards={billboards} />
      </div>

      {/* Categories */}
      <div className="bg-white">
        <CategorySection categories={categories} />
      </div>

      {/* Featured Products */}
      <section className="bg-gradient-to-tr from-emerald-50 to-white py-12">
        <FeaturedProducts products={featuredProducts} title="🌟 Featured Products" />
      </section>

      {/* New Arrivals */}
      <section className="bg-white py-12">
        <FeaturedProducts products={newArrivals} title="🆕 New Arrivals" />
      </section>

      {/* Services */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-12">
        <ServiceSection />
      </section>

      {/* Popular Products */}
      <section className="bg-white py-12">
        <FeaturedProducts products={popularProducts} title="🔥 Popular Products" />
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-yellow-50 to-white py-12">
        <Testimonials />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
