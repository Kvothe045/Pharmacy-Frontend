'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/types/types'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export default function ProductCard({ product, featured }: ProductCardProps) {
  const imageUrl = product.images[0]?.url || '/placeholder.png'
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(parseInt(product.price))
  
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className={`relative ${featured ? 'h-64' : 'h-48'} bg-gray-100`}>
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {product.size && (
            <span className="absolute top-2 left-2 bg-white/80 text-xs font-medium px-2 py-1 rounded-full">
              {product.size.value}
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-teal-600">{formattedPrice}</span>
            <button className="bg-teal-500 text-white p-2 rounded-full shadow-md hover:bg-teal-600 transition">
              <ShoppingCart size={18} />
            </button>
          </div>
          {product.category && (
            <span className="text-xs text-gray-500 mt-1 block">
              {product.category.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
