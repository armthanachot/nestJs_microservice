import {
    Controller,
    Get,
    Post,
    Req,
    Res,
    Body,
    UsePipes,
    ValidationPipe,
    Inject,
    UseInterceptors,
    UploadedFile,
  } from "@nestjs/common";
import { Request, Response } from "express";
import {SpaceshipService} from "./spaceship.service"
import { EventPattern } from "@nestjs/microservices";

@Controller('spaceship')
export class SpaceshipController {
    constructor(private readonly spaceShipService:SpaceshipService){}
    @Get()
    async findAll(@Req() req: Request, @Res() res: Response){
        const spaceShips = await this.spaceShipService.findAll()
        return res.status(200).json({data:spaceShips})
    }
    @EventPattern('all_spaceship')
    async allSpaceShip(message:string){
        const spaceShips = await this.spaceShipService.findAll()
        return spaceShips
    }
    @Post()
    async create(@Req() req: Request, @Res() res: Response,@UploadedFile() file){
        const spaceShips = req.body
        const {img} = await this.spaceShipService.fileResize(file,spaceShips.size)
        spaceShips.img = img
        const created = await this.spaceShipService.create(spaceShips)
        return res.status(200).json({message:"OK"})
    }

}
