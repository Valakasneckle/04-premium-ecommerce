export type Category =
  | "smart-speakers"
  | "headphones"
  | "keyboards"
  | "smartwatches"
  | "monitors"
  | "docking-stations"
  | "cameras"
  | "accessories";

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  image?: string;
  name: string;
  brand: string;
  category: Category;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  specs: ProductSpec[];
  features: string[];
  badge?: "new" | "sale" | "featured" | "bestseller";
  inStock: boolean;
  stockCount: number;
  gradient: string;
  accentColor: string;
  images: string[];
  relatedIds: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
  saveInfo: boolean;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export interface FilterState {
  categories: Category[];
  priceMin: number;
  priceMax: number;
  minRating: number;
  search: string;
  sort: SortOption;
}
