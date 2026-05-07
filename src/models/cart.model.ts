import { User } from './user.model';
import { Product, ProductVariant } from './product.model';
import { Coupon } from './coupon.model';

export interface Cart {
  id: number;
  customer: User;
  items: CartItem[];
  coupon?: Coupon;
  lastModified: number;
}

export interface CartItem {
  id: number;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface AddItemRequest {
  productId: number;
  quantity: number;
}
