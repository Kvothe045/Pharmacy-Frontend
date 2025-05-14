'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Dua Pharmacy</h3>
            <p className="text-gray-400">
              Your trusted partner for affordable medicines and healthcare products.
            </p>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition">Products</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/medicines" className="text-gray-400 hover:text-white transition">Medicines</Link>
              </li>
              <li>
                <Link href="/category/personal-care" className="text-gray-400 hover:text-white transition">Personal Care</Link>
              </li>
              <li>
                <Link href="/category/healthcare" className="text-gray-400 hover:text-white transition">Healthcare Devices</Link>
              </li>
              <li>
                <Link href="/category/ayurveda" className="text-gray-400 hover:text-white transition">Ayurveda</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                +91 1234567890
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                support@dua.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Dua Pharmacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
