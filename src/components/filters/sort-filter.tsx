"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "newest" | "price-low" | "price-high" | "name";

export interface SortFilterProps {
  value: SortOption;
  onValueChange: (value: SortOption) => void;
  options?: {
    newest?: string;
    "price-low"?: string;
    "price-high"?: string;
    name?: string;
  };
  placeholder?: string;
  className?: string;
}

const defaultOptions = {
  newest: "جدیدترین",
  "price-low": "قیمت: کم به زیاد",
  "price-high": "قیمت: زیاد به کم",
  name: "نام",
};

export function SortFilter({
  value,
  onValueChange,
  options = defaultOptions,
  placeholder = "مرتب‌سازی",
  className,
}: SortFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">{options.newest || defaultOptions.newest}</SelectItem>
        <SelectItem value="price-low">{options["price-low"] || defaultOptions["price-low"]}</SelectItem>
        <SelectItem value="price-high">{options["price-high"] || defaultOptions["price-high"]}</SelectItem>
        <SelectItem value="name">{options.name || defaultOptions.name}</SelectItem>
      </SelectContent>
    </Select>
  );
}

