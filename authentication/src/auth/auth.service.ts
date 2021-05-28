import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, createQueryBuilder, getRepository, getManager } from "typeorm";
import { User } from "./auth.entity";
import * as bcrypt from "bcrypt"
import * as sharp from "sharp"
import {SIZE} from "../../constant/file"

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private authRepository: Repository<User>
    ) { }
    async signup(user) {
        const result = await this.authRepository.save(user)
        return result
    }
    async login(username,password){
        const user:any = await this.authRepository.createQueryBuilder('user').select(['id','fname','lname','email','password']).where('username = :username',{username}).getRawOne()
        if(!user) return false
        const correctPassword =  this.passwordCompare(password,user.password)
        if(!correctPassword) return false
        return user
    }   
    async passwordEncrypt(password) {
        const saltRound = 10
        const encrypted = await bcrypt.hash(password, saltRound)
        return encrypted
    }
    async passwordCompare(password,comparer){
        const correct = bcrypt.compare(password,comparer)
        return correct
    }
    async schemaValidator(data, schema) {
        try {
            const validated = await schema.validateAsync(data)
            return validated
        } catch (error) {
            return error
        }
    }
    async fileResize({originalname,buffer},size){
        try {
            const result = await sharp(buffer).resize(SIZE[size]).toFile('upload/'+Date.now() + originalname)
            // const upload = await sharp(buffer).toFile('upload/'+Date.now() + originalname) //no resize
            return true
          } catch (error) {
            return false
          }
    }
}
