import { ValidateUserType } from 'src/utils/types';

export interface IAuthService {
  validateUser(validateUserData: ValidateUserType);
}
