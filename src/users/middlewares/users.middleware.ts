import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (authorization === 'jeswin') {
      console.log('customer middleware called');
      next();
    } else throw new HttpException('Auth error', HttpStatus.FORBIDDEN);
  }
}
