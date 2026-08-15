// Product types
export interface Product {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
  imageGallery?: string[];
  category: string;
  filterItems?: string[];
  isSale?: boolean;
  isNew?: boolean;
  isStocked?: boolean;
  productNumber?: string;
  variantId?: number; // Variant ID for cart operations
  colors?: string[];
  content?: string;
  description?: string;
  reviews?: Review[];
}

export interface Review {
  author: {
    image: string;
    name: string;
  };
  reviewDate: string;
  rating: number;
  content: string;
}

// Category types
export interface Category {
  categoryId: string;
  name: string;
  image: string;
  description?: string;
  productsCount?: number;
}

// Cart types
export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

// Blog types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content?: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: {
    name: string;
    image: string;
  };
  date: string;
  content: string;
}

// Navigation types
export interface NavItem {
  name: string;
  path: string;
  children?: NavItem[];
}

// Footer types
export interface FooterNav {
  title: string;
  links: {
    name: string;
    path: string;
  }[];
}

// Social links
export interface SocialLink {
  name: string;
  icon: string;
  path: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  content: string;
  rating: number;
}

// FAQ
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Order
export interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  total: number;
  shippingAddress: Address;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}


