import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product, Tag } from '../utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Tag, Category])],
})
export class ProductsModule {}
