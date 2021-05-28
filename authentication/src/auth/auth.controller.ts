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
import {AuthService} from "./auth.service"
import {CREATE_USER} from "../../schema/user.schema"
import { ClientProxy } from "@nestjs/microservices";
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,@Inject('AUTH_SERVICE') private readonly client:ClientProxy){}
    @Post("/signup")
    async signup(@Req() req: Request, @Res() res: Response){
        const user = req.body
        if(!Object.values(user).length) return res.status(404).json({message:"EMPTY DATA"})
        const validated = await this.authService.schemaValidator(user,CREATE_USER)
        console.log("validated: ",validated);
        
        if(validated.message) return res.status(400).json({message:validated.message})
        user.password = await this.authService.passwordEncrypt(user.password)
        const created = await this.authService.signup(user)
        return res.status(200).json({message:"OK"})
    }
    @Post("/login")
    async login(@Req() req: Request, @Res() res: Response){
        const {username,password} = req.body
        if(!username || !password) return res.status(401).json({message:"INVALID USERNAME OR PASSWORD"})
        const logedin = await this.authService.login(username,password)
        if(!logedin) return res.status(401).json({message:"INVALID USERNAME OR PASSWORD"})
        this.client.emit('logedin',logedin.email)
        return res.status(200).json({data:logedin})
    }
    @Get("/test")
    async test(@Req() req: Request, @Res() res: Response){
        console.log("test");
        this.client.emit('hello','hello from RabbitMQ')
        this.client.emit('all_spaceship','request all space ships data')
        return res.status(200).json({message:"success RabbitMQ"})
    }
    @Post("/profile")
    async profile(@Req() req: Request, @Res() res: Response,@UploadedFile() file){
        console.log(req.body);
        console.log(file);
        const {size} = req.body
        const uploaded = await this.authService.fileResize(file,size)
        console.log(uploaded);
        return res.status(200).json({message:"OK"})
    }
}
