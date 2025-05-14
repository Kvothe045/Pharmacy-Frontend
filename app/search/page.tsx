"use client";

import { Suspense, useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import { getProducts, getCategories } from '@/lib/api';
import { Product, Category } from '@/types/types';
import SearchResults from '@/components/search-result';

// Create a separate component that uses useSearchParams
function SearchPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load search data:', error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">Loading...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SearchResults
        allProducts={products}
        categories={categories}
      />
    </div>
  );
}

// Main component with Suspense boundary
export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center py-12">Loading search results...</div>}>
        <SearchPageContent />
      </Suspense>
    </main>
  );
}
