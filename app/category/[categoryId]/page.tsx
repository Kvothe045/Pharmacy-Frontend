"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product-card';
import CategorySection from '@/components/category-section';
import Navbar from '@/components/navbar';
import { Product, Category } from '@/types/types';

export default function CategoryPage() {
  // Use pathname to get the categoryId instead of params
  const pathname = usePathname();
  const categoryId = pathname ? pathname.split('/').pop() : null;
  
  // Use the existing type definitions from your project
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch all data
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        // No need for type assertions since we're using the correct types
        setProducts(productsData);
        setCategories(categoriesData);
        
        // Find the current category
        const foundCategory = categoriesData.find(cat => cat.id === categoryId);
        if (foundCategory) {
          setCategory(foundCategory);
        } else {
          setCategory(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setLoading(false);
      }
    }
    
    if (categoryId) {
      loadData();
    }
  }, [categoryId]);

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">Loading...</div>
        </div>
      </main>
    );
  }
  
  // Handle category not found
  if (!category) {
    return notFound();
  }
  
  // Filter products for this category
  const categoryProducts = products.filter(product => 
    product.category?.id === categoryId
  );

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
  );
}