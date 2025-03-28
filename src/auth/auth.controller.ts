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
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiBearerAuth
} from '@nestjs/swagger';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {UsersService} from '../users/users.service';
import {RegisterDto} from "./register.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {
    }

    @Post('login')
    @ApiOperation({
        summary: 'User login',
        description: 'Authenticate a user and return an access token'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: {type: 'string', example: 'johndoe'},
                password: {type: 'string', example: 'password123'}
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        schema: {
            type: 'object',
            properties: {
                access_token: {type: 'string'}
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - Invalid credentials'
    })
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() signInDto: Record<string, any>) {
        const result = await this.authService.signIn(signInDto.username, signInDto.password);
        if (result) {
            await this.usersService.updateLastLogin(signInDto.username);
        }
        return result;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get user profile',
        description: 'Retrieve the profile of the authenticated user'
    })
    @ApiResponse({
        status: 200,
        description: 'User profile retrieved successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - Authentication required'
    })
    getProfile(@Request() req) {
        return this.usersService.findOne(req.user.username);
    }

    @Post('register')
    @ApiOperation({
        summary: 'User registration',
        description: 'Register a new user and return an access token'
    })
    @ApiBody({type: RegisterDto})
    @ApiResponse({
        status: 201,
        description: 'User registered successfully',
        schema: {
            type: 'object',
            properties: {
                access_token: {type: 'string'}
            }
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Validation failed'
    })
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}