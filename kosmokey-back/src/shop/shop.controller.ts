import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Routes, Services } from '../utils/constants';
import { Shop, User } from '../utils/typeorm';
import { Repository } from 'typeorm';
import { IShopService } from './shop';
import { CreateShopDto } from './dtos/CreateShop.dto';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { ShopService } from './shop.service';
import { AuthUser } from 'src/utils/decorators';

@Controller(Routes.SHOPS)
@UseGuards(AuthenticatedGuard)
export class ShopController {
  constructor(
    @Inject(Services.SHOPS) private readonly shopService: IShopService,
  ) {}

  @Post()
  async createShop(
    @AuthUser() user: User,
    @Body() createShopData: CreateShopDto,
  ) {
    return await this.shopService.createShop(user, createShopData);
  }

  @Get(':id')
  async getShopFromSellerId(@Param('id', ParseIntPipe) id: number) {
    return await this.shopService.findShopBySellerId(id);
  }
}
