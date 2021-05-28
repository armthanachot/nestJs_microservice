import {
    Controller,
    Get,
    Post,
    Req,
    Res,
    Body,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { Request, Response } from "express";
import * as formData from "form-data"
import axios from "axios"

@Controller('notify')
export class NotifyController {
    constructor() { }
    @Get()
    async noti(@Req() req: Request, @Res() res: Response) {
        return res.status(200).json({ message: "Hey this is notify" })
    }
    @EventPattern('hello')
    async hello(data: string) {
        console.log(data);
    }
    @EventPattern('email')
    async sendMail(email: string) {
        console.log(email);

    }
    @EventPattern('logedin')
    async loginNotify(email: string) {
        const form = new formData()
        const current_date = new Date(Date.now())
        form.append('message', `${email} is loged in ${current_date}`)
        await axios({
            method: 'post',
            url: 'https://notify-api.line.me/api/notify',
            headers: { 
              'Authorization': 'Bearer MXIOPwVa5or3OqgsFHaapkpgJC1dgI2zo99yVS2u6Zx', 
              ...form.getHeaders()
            },
            data : form
          })
    }
}
