import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {SpaceShip} from "./spaceship.entity"
import {SpaceshipController} from "./spaceship.controller"
import {SpaceshipService} from "./spaceship.service"
@Module({
    imports:[TypeOrmModule.forFeature([SpaceShip])],
    controllers:[SpaceshipController],
    providers:[SpaceshipService]
})
export class SpaceshipModule {}
