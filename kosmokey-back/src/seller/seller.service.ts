import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from 'src/utils/typeorm';
import { CreateSellerType } from 'src/utils/types';
import { In, Repository } from 'typeorm';
import { ISellerService } from './seller';

@Injectable()
export class SellerService implements ISellerService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  createSeller(createSellerData: CreateSellerType) {
    throw new Error('Method not implemented.');
  }
  async findShopBySeller(sellerId: number) {
    const seller = await this.sellerRepository.findOne(
      { id: sellerId },
      { relations: ['shop'] },
    );

    const sellerShop = seller.shop;

    if (!sellerShop)
      throw new HttpException(
        "Cette boutique n'existe pas ou ne vous appartient pas",
        HttpStatus.UNAUTHORIZED,
      );
    return sellerShop;
  }
}
