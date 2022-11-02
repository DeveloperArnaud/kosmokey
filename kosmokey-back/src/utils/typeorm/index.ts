import { User } from '../typeorm/entities/User';
import { Session } from './entities/Session';
import { Shop } from './entities/Shop';
import { Seller } from './entities/Seller';
import { Category } from './entities/Category';
import { Product } from './entities/Product';
import { Tag } from './entities/Tag';
const entities = [User, Session, Shop, Seller, Category, Product, Tag];

export default entities;

export { User, Session, Shop, Seller, Category, Product, Tag };
