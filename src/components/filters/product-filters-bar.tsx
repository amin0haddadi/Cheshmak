'use client';

import { useState } from 'react';

import { ChevronDown, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { type Category, CategoryFilter } from './category-filter';
import { SortFilter, type SortOption } from './sort-filter';

export interface ProductFiltersBarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount?: number;
  countLabel?: string;
  className?: string;
}

export function ProductFiltersBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalCount,
  countLabel = 'محصول',
  className,
}: ProductFiltersBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    onCategoryChange(categoryId);
    setShowFilters(false);
  };

  const hasActiveCategory = selectedCategory !== 'all';

  return (
    <div className={cn('mb-8 border-b pb-6', className)}>
      {/* Desktop */}
      <div className='hidden gap-4 md:flex md:items-center md:justify-between'>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          variant='desktop'
        />

        <div className='flex shrink-0 items-center gap-4'>
          {totalCount !== undefined && (
            <span className='whitespace-nowrap text-sm text-muted-foreground'>
              {totalCount} {countLabel}
            </span>
          )}
          <SortFilter
            value={sortBy}
            onValueChange={onSortChange}
            className='w-[180px]'
          />
        </div>
      </div>

      {/* Mobile */}
      <div className='space-y-3 md:hidden'>
        <div className='flex items-center gap-2'>
          <Button
            type='button'
            variant={showFilters ? 'secondary' : 'outline'}
            onClick={() => setShowFilters(open => !open)}
            className={cn(
              'h-10 shrink-0 gap-2 px-3',
              hasActiveCategory && !showFilters && 'border-primary',
            )}
            aria-expanded={showFilters}
          >
            <Filter className='size-4 shrink-0' />
            <span className='text-sm'>فیلترها</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 opacity-60 transition-transform duration-200',
                showFilters && 'rotate-180',
              )}
            />
          </Button>

          {totalCount !== undefined && (
            <p className='px-1 text-xs text-muted-foreground'>
              {totalCount} {countLabel}
            </p>
          )}

          <SortFilter
            value={sortBy}
            onValueChange={onSortChange}
            className='h-10 min-w-0 flex-1'
          />
        </div>

        {showFilters && (
          <div className='animate-fade-in rounded-xl border bg-muted/40 p-3'>
            <p className='mb-3 text-xs font-medium text-muted-foreground'>
              دسته‌بندی
            </p>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              variant='mobile'
            />
          </div>
        )}
      </div>
    </div>
  );
}
