import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { getRepository } from 'typeorm';
import { Session } from './utils/typeorm';
import { TypeormStore } from 'connect-typeorm/out';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  const sessionRepository = getRepository(Session);

  app.use(
    session({
      name: 'kosmokey',
      secret: COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 86400000 },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
