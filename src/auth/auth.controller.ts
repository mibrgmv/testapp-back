import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {UsersService} from '../users/users.service';
import {RegisterDto} from "./register.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>) {
        const result = await this.authService.signIn(signInDto.username, signInDto.password);
        if (result) {
            await this.usersService.updateLastLogin(signInDto.username);
        }
        return result;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}