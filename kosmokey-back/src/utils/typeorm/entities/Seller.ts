import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shop } from './Shop';

@Entity({ name: 'sellers' })
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numberPhone: string;

  @OneToOne(() => Shop)
  @JoinColumn()
  shop: Shop;
}
