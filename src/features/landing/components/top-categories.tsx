import { TopCategoriesContent } from "./top-categories-content";

export function TopCategories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-display text-lg mb-2">
            برترین
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">دسته‌بندی‌ها</h2>
        </div>

        {/* Categories Grid */}
        <TopCategoriesContent />
      </div>
    </section>
  );
}

