import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller';
import {User} from "../users/user.entity";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        JwtModule.register({
            global: true,
            secret: "hbj278sdkjad", // todo
            signOptions: {expiresIn: '60s'},
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})

export class AuthModule {}
