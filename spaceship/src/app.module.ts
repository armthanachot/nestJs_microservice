import { Module, NestModule ,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpaceshipModule } from './spaceship/spaceship.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {SpaceShip} from "./spaceship/spaceship.entity"
import { Connection } from 'typeorm';
import * as multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({storage})

@Module({
  imports: [SpaceshipModule,TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    database:"nest_microservice_spaceship",
    port:3306,
    username:"root",
    password:"",
    entities:[SpaceShip],
    synchronize:true
    // ถ้า true เวลาเพิ่ม entities ระบบจะ gen table ให้เอง แต่ให้ปิดตอน production โดยลบออก หรือ set เป้น false 
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule  {
  constructor(private connection:Connection){}
  configure(consumer:MiddlewareConsumer){
    const {GET,POST,PUT,DELETE} = RequestMethod
    consumer.apply(upload.single('img')).forRoutes({path:'spaceship',method:POST})
  }
}
