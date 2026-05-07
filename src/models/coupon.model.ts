export enum DiscountType {
  PERCENT = 'PERCENT',
  FIXED = 'FIXED'
}

export interface Coupon {
  id: number;
  code: string;
  type: DiscountType;
  value: number;
  expirationDate: string; // ISO date
  maxUsages?: number;
  currentUsages: number;
  active: boolean;
}

export interface CouponResponse {
  id: number;
  code: string;
  type: DiscountType;
  value: number;
  expirationDate: string;
  active: boolean;
}

export interface CouponRequest {
  code: string;
  type: DiscountType;
  value: number;
  expirationDate: string;
  maxUsages?: number;
}
