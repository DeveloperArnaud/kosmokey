import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { ISellerService } from './seller';
import { SellerService } from './seller.service';

@Controller(Routes.SELLERS)
export class SellerController {
  constructor(
    @Inject(Services.SELLER) private readonly sellerService: ISellerService,
  ) {}

  @Get(':id/shop')
  async getShopFromSeller(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return await this.sellerService.findShopBySeller(id);
  }
}
