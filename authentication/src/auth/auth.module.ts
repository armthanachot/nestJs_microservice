import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./auth.entity"
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
    imports: [TypeOrmModule.forFeature([User]),ClientsModule.register([
        {
          name: 'AUTH_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqps://nppbytft:4LVSaR6GzC6-qaj8nk93eZppVCeMilpW@baboon.rmq.cloudamqp.com/nppbytft'],
            queue: 'main_que',
            queueOptions: {
              durable: false
            },
          },
        },
      ])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
