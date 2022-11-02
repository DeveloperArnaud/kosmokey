import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller, Shop } from 'src/utils/typeorm';
import { Services } from 'src/utils/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Seller, Shop])],
  providers: [
    {
      provide: Services.SELLER,
      useClass: SellerService,
    },
  ],
  controllers: [SellerController],
})
export class SellerModule {}
