import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { Shop } from './Shop';
import { Tag } from './Tag';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  isPublished: boolean;

  @Column()
  imgSrc: string;

  @Column()
  grams: number;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @OneToMany(() => Tag, (tag) => tag.product)
  tags: Tag[];
}
