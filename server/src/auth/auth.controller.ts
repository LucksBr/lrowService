import { Body, Controller, Post } from "@nestjs/common";
import AuthService from "./auth.service";
import LoginDTO from "./login.dto";
import { Public } from "./decorators/public.decorator";

@Controller("auth")
export default class AuthController {

    constructor(private readonly authService: AuthService){}

    @Public()
    @Post("/login")
    login(@Body() loginDTO: LoginDTO){
        return this.authService.login(loginDTO?.email, loginDTO?.password)
    }

}