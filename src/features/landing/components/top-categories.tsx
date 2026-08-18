import { TopCategoriesContent } from "./top-categories-content";

export function TopCategories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block font-display text-lg text-primary">
            برترین
          </span>
          <h2 className="text-3xl font-bold md:text-4xl">دسته‌بندی‌ها</h2>
        </div>

        {/* Categories Grid */}
        <TopCategoriesContent />
      </div>
    </section>
  );
}

