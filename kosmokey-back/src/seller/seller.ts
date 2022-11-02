import { CreateSellerType } from 'src/utils/types';

export interface ISellerService {
  createSeller(createSellerData: CreateSellerType);
  findShopBySeller(sellerId: number);
}
