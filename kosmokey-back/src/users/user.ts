import { CreateUserType, FindUserType } from '../utils/types';

export interface IUserService {
  createUser(createUserData: CreateUserType);
  findUser(findUserData: FindUserType);
}
