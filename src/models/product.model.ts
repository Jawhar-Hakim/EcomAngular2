import { User } from './user.model';
import { CategoryResponse } from './category.model';

export interface Product {
  id: number;
  seller: User;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  stock: number;
  active: boolean;
  createdAt: number;
  categories: CategoryResponse[];
  images: string[];
}

export interface ProductVariant {
  id: number;
  attribute: string;
  value: string;
  additionalStock: number;
  priceDelta: number;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  stock: number;
  categoryIds: number[];
  images: string[];
  active?: boolean;
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  stock: number;
  active: boolean;
  createdAt: number;
  seller: User;
  categories: CategoryResponse[];
  images: string[];
}
