import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto, UsersService } from "./users.service";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get()
    @ApiOperation({
        summary: 'Get all users',
        description: 'Retrieve a list of all users with their details'
    })
    @ApiResponse({
        status: 200,
        description: 'List of users retrieved successfully',
        type: [UserDto]
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - Authentication required'
    })
    async getAllUsersWithDetails(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }
}