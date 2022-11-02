import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';

@Entity({ name: 'shops' })
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  brandName: string;

  @Column()
  description: string;

  @Column()
  logo: string;

  @Column()
  siren: number;

  @Column()
  postalAddress: string;

  @Column()
  city: string;

  @Column()
  zip: string;

  @Column()
  country: string;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];
}
