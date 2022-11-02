import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/constants';
import { Seller, Shop } from 'src/utils/typeorm';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Seller])],
  controllers: [ShopController],
  providers: [
    {
      provide: Services.SHOPS,
      useClass: ShopService,
    },
  ],
})
export class ShopModule {}
