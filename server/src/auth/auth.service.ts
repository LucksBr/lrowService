import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { ServiceException } from "src/core/exceptions/service.exception";
import type UserServiceInterface from "src/user-module/service/user.service.interface";
import { USER_SERVICE } from "src/user-module/service/user.service.token";

@Injectable()
export default class AuthService {

    constructor(
        @Inject(USER_SERVICE) 
        private readonly userService: UserServiceInterface,
        private readonly jwtService: JwtService
    ){}

    async login(email: string, password: string) {
        if(!email || !password) 
            throw new ServiceException("Para realizar o login é necessário informar o email e senha")

        const userSearched = await this.userService.findByEmail(email)

        if(!userSearched) throw new UnauthorizedException('Credenciais inválidas')

        const isThePassordProvidedValid = await argon2.verify(userSearched.password,password)

        if(!isThePassordProvidedValid) throw new UnauthorizedException('Credenciais inválidas')

        return {
            acessToken: this.jwtService.sign({
                sub: userSearched.id,
                email: userSearched.email
            })
        }
    }

}