import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, hashPassword } from 'src/utils/helpers';
import { User } from '../utils/typeorm/entities/User';
import { CreateUserType, FindUserType } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IUserService } from './user';
import { Seller } from 'src/utils/typeorm';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async createUser(createUserData: CreateUserType) {
    const { email, password, numberPhone } = createUserData;
    const existingUser = await this.userRepository.findOne({ email });
    if (existingUser)
      throw new HttpException(
        'Un utilisateur existe déjà avec cette adresse e-mail',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await hashPassword(password);
    const seller = await this.sellerRepository.findOne({ numberPhone });
    console.log(seller);
    if (seller)
      throw new HttpException(
        'Un vendeur existe déjà avec ce numéro de téléphone',
        HttpStatus.CONFLICT,
      );

    const newSeller = this.sellerRepository.create({ numberPhone });
    const savedSeller = await this.sellerRepository.save(newSeller);

    const newUser = this.userRepository.create({
      ...createUserData,
      password: hashedPassword,
      seller: savedSeller,
    });

    return await this.userRepository.save(newUser);
  }

  async findUser(findUserData: FindUserType): Promise<User> {
    console.log(findUserData);
    const user = await this.userRepository.findOne(
      {
        email: findUserData.email,
      },
      { relations: ['seller', 'seller.shop'] },
    );
    console.log('user', user);
    return user;
  }
}
