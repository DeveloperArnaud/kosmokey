import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { comparePassword } from 'src/utils/helpers';
import { ValidateUserType } from 'src/utils/types';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  async validateUser(userData: ValidateUserType) {
    const { password } = userData;
    const user = await this.userService.findUser(userData);
    if (!user)
      throw new HttpException(
        'E-mail ou mot de passe invalide(s)',
        HttpStatus.UNAUTHORIZED,
      );

    const isMatch = await comparePassword(user.password, password);

    return isMatch ? user : null;
  }
}
