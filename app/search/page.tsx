"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '@/lib/api';
import SearchResults from '@/components/search-result';
import Navbar from '@/components/navbar';
import { Product, Category } from '@/types/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

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
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchResults
          allProducts={products}
          categories={categories}
          query={query}
        />
      </div>
    </main>
  );
}
