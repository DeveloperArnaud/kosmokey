import { User } from 'src/utils/typeorm';
import { CreateShopType } from 'src/utils/types';

export interface IShopService {
  createShop(user: User, createShopData: CreateShopType);
  findShopBySellerId(sellerId: number);
}
