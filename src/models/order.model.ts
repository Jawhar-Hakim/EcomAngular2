import { User } from './user.model';
import { Product, ProductVariant } from './product.model';
import { Address } from './address.model';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED'
}

export interface Order {
  id: number;
  customer: User;
  status: OrderStatus;
  orderNumber: string;
  deliveryAddress: Address;
  subTotal: number;
  shippingCost: number;
  totalAmount: number;
  discountAmount: number;
  orderDate: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  customer: User;
  status: OrderStatus;
  subTotal: number;
  discountAmount: number;
  shippingCost: number;
  totalAmount: number;
  orderDate: number;
  items: OrderItemResponse[];
}

export interface OrderItemResponse {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}
