'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
  }

  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="h-12 w-40 relative">
              <Image 
                src="/logo.png" 
                alt="Dua Pharmacy" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search for Medicines, Products, Brands & More"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-1 rounded-md"
              >
                <Search size={18} />
              </button>
            </div>
          </form>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/account" className="text-gray-700 hover:text-green-600 transition">
              <User size={24} />
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-green-600 transition">
              <ShoppingCart size={24} />
            </Link>
            <Link href="/contact" className="hidden md:block">
              <Image 
                src="/whatsapp-icon.png" 
                alt="Contact Us" 
                width={24} 
                height={24} 
              />
            </Link>
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for Medicines, Products, Brands & More"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-1 rounded-md"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex overflow-x-auto space-x-6 py-3 scrollbar-hide">
            <li><Link href="/" className="whitespace-nowrap hover:text-green-200 transition">Home</Link></li>
            <li><Link href="/products" className="whitespace-nowrap hover:text-green-200 transition">All Products</Link></li>
            <li><Link href="/account" className="whitespace-nowrap hover:text-green-200 transition">My Account</Link></li>
            <li><Link href="/cart" className="whitespace-nowrap hover:text-green-200 transition">Cart</Link></li>
            <li><Link href="/orders" className="whitespace-nowrap hover:text-green-200 transition">My Orders</Link></li>
            <li><Link href="/about" className="whitespace-nowrap hover:text-green-200 transition">About Us</Link></li>
          </ul>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="max-w-7xl mx-auto px-4 space-y-3">
            <Link href="/" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
              All Products
            </Link>
            <Link href="/account" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
              My Account
            </Link>
            <Link href="/orders" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
              My Orders
            </Link>
            <Link href="/about" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
