import { Request } from 'express';
import { Product, Seller, Shop, User } from './typeorm';

export type CreateUserType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  numberPhone: string;
};

export interface AuthenticatedRequest extends Request {
  user: User;
}

export type FindUserType = Partial<{
  id: number;
  email: string;
}>;

export type ValidateUserType = {
  email: string;
  password: string;
};

export type CreateShopType = {
  brandName: string;
  description: string;
  logo: string;
  siren: number;
  postalAddress: string;
  city: string;
  zip: string;
  country: string;
  products: Product[];
};

export type CreateSellerType = {
  numberPhone: string;
  shop: Shop;
};
