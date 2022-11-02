import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ShopModule } from './shop/shop.module';
import { SellerModule } from './seller/seller.module';
import entities from './utils/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development' }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      entities,
      synchronize: true,
      logging: false,
    }),
    ProductsModule,
    ShopModule,
    SellerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
