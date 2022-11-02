import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, response, Response } from 'express';
import { ISellerService } from 'src/seller/seller';
import { IUserService } from 'src/users/user';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUserService, //@Inject(Services.SELLER) private readonly sellerService: ISellerService,
  ) {}

  @Post('register')
  async register(@Body() createUserData: CreateUserDto) {
    const user = await this.usersService.createUser(createUserData);
    return instanceToPlain(user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Res() response: Response) {
    return response.sendStatus(HttpStatus.OK);
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async status(@Res() response: Response, @Req() request: Request) {
    response.send(request.user);
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() request: Request, @Res() response: Response) {
    await request.session.destroy((err) => {
      return false;
    });

    await response.clearCookie('kosmokey');
    return response.send({
      message: 'Vous avez été deconnecté',
    });
  }
}
