import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Test implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.path);
    console.log(req.method);
    console.log(req.params ? true:false);
    next();
  }
}
