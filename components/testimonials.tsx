'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: "MediShop saved me 50% on my last refill and the delivery was lightning-fast!",
    author: "Rahul Sharma",
    rating: 5
  },
  {
    quote: "Great selection of products and the prices are much better than my local pharmacy.",
    author: "Priya Patel",
    rating: 4
  },
  {
    quote: "The prescription upload feature is so convenient. Will definitely use again!",
    author: "Amit Kumar",
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 text-center">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
              <p className="font-medium">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
