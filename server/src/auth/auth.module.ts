import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import AuthService from "./auth.service";
import JwtStrategy from "./jwt.strategy";
import AuthController from "./auth.controller";
import UserModule from "src/user-module/user.module";
import { ConfigService } from "@nestjs/config";
import { config } from "process";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '1d',
                }
            })
        }),
        UserModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}