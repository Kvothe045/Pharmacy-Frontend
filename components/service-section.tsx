'use client'

import { FileText, RefreshCw, ShoppingCart, Package } from 'lucide-react'

const services = [
  {
    icon: <FileText size={32} className="text-teal-600" />,
    title: 'Order Medicine',
    desc: 'Genuine medicine at max discounts delivered to your door.',
  },
  {
    icon: <Package size={32} className="text-teal-600" />,
    title: 'By Prescription',
    desc: 'Upload your prescription and get home delivery.',
  },
  {
    icon: <RefreshCw size={32} className="text-teal-600" />,
    title: 'Reorder Medicine',
    desc: 'Maximum discount free delivery at your doorstep.',
  },
  {
    icon: <ShoppingCart size={32} className="text-teal-600" />,
    title: 'Shop by Category',
    desc: 'Browse medicines, personal care & household supplies.',
  },
]

export default function ServiceSection() {
  return (
    <section className="py-12 bg-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => (
            <div 
              key={service.title} 
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
