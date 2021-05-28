import { Module, NestModule ,MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {User} from "./auth/auth.entity"
import { TypeOrmModule } from '@nestjs/typeorm';
import * as multer from "multer"
import { Connection } from 'typeorm';
const storage = multer.memoryStorage()
const upload = multer({storage})
@Module({
  imports: [AuthModule,TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    database:"nest_microservice",
    port:3306,
    username:"root",
    password:"",
    entities:[User],
    synchronize:true
    // ถ้า true เวลาเพิ่ม entities ระบบจะ gen table ให้เอง แต่ให้ปิดตอน production โดยลบออก หรือ set เป้น false 
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private connection:Connection){}
  configure(consumer:MiddlewareConsumer){
    const {GET,POST,PUT,DELETE} = RequestMethod
    consumer.apply(upload.single('img')).forRoutes({path:'auth',method:POST})
  }
}
