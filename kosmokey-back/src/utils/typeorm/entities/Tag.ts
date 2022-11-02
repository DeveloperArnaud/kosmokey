import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @ManyToOne(() => Product, (product) => product.tags)
  product: Product;
}
