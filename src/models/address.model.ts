export interface Address {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
}

export interface AddressRequest {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
}
