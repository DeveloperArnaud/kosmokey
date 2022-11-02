import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { AuthUser } from 'src/utils/decorators';
import { Seller, Shop, User } from 'src/utils/typeorm';
import { CreateShopType } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IShopService } from './shop';

@UseGuards(AuthenticatedGuard)
@Injectable()
export class ShopService implements IShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async findShopBySellerId(sellerId: number) {
    const shop = await this.shopRepository
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.seller', 'seller')
      .where('seller.id =:sellerId', { sellerId });
    return shop;
  }

  async createShop(@AuthUser() user: User, createShopData: CreateShopType) {
    const { seller } = user;
    const existingShop = seller.shop;
    if (existingShop)
      throw new HttpException(
        'Vous possédez déjà une boutique',
        HttpStatus.CONFLICT,
      );
    const newShop = this.shopRepository.create(createShopData);
    const savedShop = await this.shopRepository.save(newShop);

    seller.shop = savedShop;

    await this.sellerRepository.save(seller);

    return savedShop;
  }
}
