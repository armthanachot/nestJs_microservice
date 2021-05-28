import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, createQueryBuilder, getRepository, getManager } from "typeorm";
import {SpaceShip} from "./spaceship.entity"
import * as sharp from "sharp"
import {SIZE} from "../../constant/file"

@Injectable()
export class SpaceshipService {
    constructor(
        @InjectRepository(SpaceShip) private spaceRepository: Repository<SpaceShip>
    ){}
    async findAll(){
        const result = await this.spaceRepository.find()
        return result
    }
    async create(spaceShips){
        const result = await this.spaceRepository.save(spaceShips)
        return result
    }
    async fileResize({originalname,buffer},size){
        try {
            const fileName = `upload/${Date.now()}${originalname}`
            const result = await sharp(buffer).resize(SIZE[size]).toFile(fileName)
            // const upload = await sharp(buffer).toFile(fileName) //no resize
            result.img = fileName
            return result
          } catch (error) {
            return false
          }
    }
}
