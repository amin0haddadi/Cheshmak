"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  showInfo?: boolean;
  previousLabel?: string;
  nextLabel?: string;
}

export function Pagination({
  currentPage,
  lastPage,
  onPageChange,
  className,
  showInfo = true,
  previousLabel = "قبلی",
  nextLabel = "بعدی",
}: PaginationProps) {
  if (lastPage <= 1) return null;

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        {previousLabel}
      </Button>
      
      {showInfo && (
        <span className="text-sm text-muted-foreground">
          صفحه {currentPage} از {lastPage}
        </span>
      )}
      
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(lastPage, currentPage + 1))}
        disabled={currentPage === lastPage}
      >
        {nextLabel}
      </Button>
    </div>
  );
}

