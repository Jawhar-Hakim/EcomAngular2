import { User } from './user.model';

export interface SellerProfile {
  id: number;
  user: User;
  shopName: string;
  description?: string;
  logo?: string;
  rating?: number;
}

export interface SellerProfileRequest {
  shopName: string;
  description?: string;
  logo?: string;
}
