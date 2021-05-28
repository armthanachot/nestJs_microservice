import { NestFactory } from '@nestjs/core';
import { Transport,MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options:{
        urls:['amqps://nppbytft:4LVSaR6GzC6-qaj8nk93eZppVCeMilpW@baboon.rmq.cloudamqp.com/nppbytft'],
        queue:'main_que',
        queueOptions:{
          durable:false
        }
      }
    },
  );
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
